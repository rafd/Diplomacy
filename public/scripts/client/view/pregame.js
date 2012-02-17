define(['scripts/client/bootstrap.js'], function(){

  window.PreGameView = Backbone.View.extend({
    template: T['pregame'],
    className: 'pregame',
    id: this.id,
    events: {
      "click .boot": "bootPlayer",
      "click .selectable": "selectPower",
      "click .startGame": "startGame",
      "click .goToLobby": "goToLobby"
    },
    initialize: function(){

      //for testing purposes, lets arbitrarily assign the last player to be the local player.
      //this.local_id = this.model.get('players').last().get('user').get('id')
      console.log(this.local_id)

      console.log('assigning self to parent gameview..')
      this.parentView = this.options['parentView']
      this.parentView.gameView = this
      this.render();
    },
    render: function(){

      console.log('rendering pregame')
      $(this.el).html(this.template.r({}));

      if($("#diplomacy .pregame").length == 0){
        $('#diplomacy').append(this.el);
      } else {
        $('#diplomacy .pregame').replaceWith(this.el);
      }

      var playerlist = new PlayerList(this.model.get('players'));
      var powerlist = new PowerList(this.model.get('players')); 
    },
    goToLobby: function(){
      $(this.el).hide()
      $(".lobby").show()
    },
    bootPlayer: function(ev){
      var boot_id = $(ev.target).attr("id");
      console.log('booting: ', boot_id)
      var player_list = this.model.get('players');

      //filter, _.find give me problems. using for loop for now.

      for (var i=0;i<player_list.length;i++){
        if (player_list.at(i).get('user').get('id') == boot_id){
          //Remove player for list
          player_list.at(i).destroy(); 
        }
      }
      // console.log(JSON.stringify(this.model.get('players')));
      //Probably not best implementation.
      //updates player list and power list views
      var playerlist = new PlayerList(this.model.get('players'));
      var powerlist = new PowerList(this.model.get('players'));
    },
    selectPower: function(ev){
      //user_selected, other_selected, selectable
      var power = $(ev.target).attr('class').split(' ').filter(function(element){return ($.inArray(element,PLAYERS)!=-1)})[0]
      console.log('player select: ', power);

      //ASSIGN LOCAL USER POWER HERE
      // this.model.get('players').find()
      // var atemp = _.find(this.model.get('players'), function(player){return player['user']['id'] = this.local_id})
      // console.log(JSON.stringify(atemp))
      // atemp['power'] = power

      var player_list = this.model.get('players');
      for (var i=0;i<player_list.length;i++){
        if (player_list.at(i).get('user').get('id') == this.local_id){
          player_list.at(i).set({'power': power})
        }
      }


      //re-render power list
      var powerlist = new PowerList(this.model.get('players'))
      var playerlist = new PlayerList(this.model.get('players'))
    },
    startGame: function(ev){
      $(this.el).hide()
      this.parentView.gameView = new BoardView({model:this.model})
      window.currentGameView = this.parentView.gameView
    }

  });

  var PlayerList = Backbone.View.extend({
    template: T['players_pregame'],
    initialize: function(players){

      console.log('rendering playerlist')
      $(this.el).html(this.template.r({players:players.toJSON()}));
      //I don't like this setup. fix later. template creates an empty div I may want to get rid of.
      $('#player-list').empty();
      $('#player-list').append(this.el);


    }

  });

  PowerList = Backbone.View.extend({
    template: T['powers_pregame'],
    initialize: function(players){

      this.render(players);

    },
    render: function(players){
      //assemble power dict for template
      var powerdict = [];
      PLAYERS.forEach(function(power){
        var state = 'selectable';
        //iterate through powers, if power taken by player, assign state
        if (_.any(players.models, function(player){return player.get('power') == power})) 
          state='player_selected';
        powerdict.push({name: power, select_state:state})
      });

      // console.log(JSON.stringify(powerdict))



      console.log('rendering powerlist')



      $(this.el).html(this.template.r({powers:powerdict}))
      $('#power-list').empty();
      $('#power-list').append(this.el);
    }

  });

});