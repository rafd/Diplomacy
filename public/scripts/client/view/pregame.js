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

      console.log('initializing pregame')

      this.playerlist = new PlayerList(this.model.get('players'));
      this.powerlist = new PowerList(this.model.get('players'));

      this.model.get('players').bind("change", function(){this.playerlist.render(this.model.get('players'))}, this)
      this.model.get('players').bind("change", function(){this.powerlist.render(this.model.get('players'))}, this)

      this.parentView = this.options['parentView']

      return this;
    },
    render: function(){

      console.log('rendering pregame')
      if($("#diplomacy .pregame").length == 0)
        $('#diplomacy').append(this.el);

      $(this.el).html(this.template.r({}));

      this.playerlist.render(this.model.get('players'));
      this.powerlist.render(this.model.get('players'));

    },
    goToLobby: function(){
      $(this.el).hide()
      $(".lobby").show()
    },
    bootPlayer: function(ev){
      var boot_id = $(ev.target).attr("id");
      console.log('booting: ', boot_id)
      var player_list = this.model.get('players');

      //delete not yet implemented
      player_list.find(function(player){return player.id == boot_id}).delete
    },
    selectPower: function(ev){
      //user_selected, other_selected, selectable
      var power = $(ev.target).attr('class').split(' ').filter(function(element){return ($.inArray(element,PLAYERS)!=-1)})[0]
      console.log('player select: ', power);
      var player_list = this.model.get('players');

      player_list.find(function(player){return player.get('user').id == window.user.id}).set({'power':power});

    },
    startGame: function(ev){
      $(this.el).hide()
      this.parentView.dest = new BoardView({model:this.model})
      window.currentGameView = this.parentView.dest
    }

  });

  var PlayerList = Backbone.View.extend({
    template: T['players_pregame'],
    anchor: '#player-list-ul',
    initialize: function(){

    },
    render: function(players){
      $(this.anchor).empty();
      players.forEach(function(player){this.addOne(player)}, this);

    },
    addOne: function(player){
      // console.log(player.toData())
      // console.log(this.template.r(player.toData()))
      $(this.anchor).append(this.template.r(player.toData()))
    }

  });

  PowerList = Backbone.View.extend({
    template: T['powers_pregame'],
    anchor: '#power-list',
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



      // console.log('rendering powerlist')



      $(this.el).html(this.template.r({powers:powerdict}))

      $(this.anchor).empty();
      $(this.anchor).append(this.el);
    }

  });

});