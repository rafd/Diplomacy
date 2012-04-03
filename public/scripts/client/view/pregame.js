define(['scripts/client/bootstrap.js'], function(){

  window.PreGameView = Backbone.View.extend({
    template: T['pregame'],
    className: 'pregame',
    events: {
      "click .goToLobby": "goToLobby",
      "click .startGame": "startGame"
    },
    initialize: function(options){
      this.game = options.game;
      this.parentView = options.parentView;

      if($("#diplomacy .pregame").length == 0)
        $('#diplomacy').append(this.el);
      else
        $('#diplomacy .pregame').replaceWith(this.el);

      $(this.el).html(this.template.r({}));

      new PlayerList({game:this.game, target: $(this.el).find('.player-list')});
      new PowerList({game:this.game, target: $(this.el).find('.power-list')})

    },
    goToLobby: function(){
      $(this.el).hide()
      $(".lobby").show()
    },
    selectPower: function(ev){
      //user_selected, other_selected, selectable
      var power = $(ev.target).attr('class').split(' ').filter(function(element){return ($.inArray(element,PLAYERS)!=-1)})[0]
      console.log('player select: ', power);
      var player_list = this.game.get('players');

      var choosing_player = this.game.get('players').find(function(player){return player.get('user').id == window.user.id})
      choosing_player.set({'power':power});
      choosing_player.save();

    },
    startGame: function(ev){
      $(this.el).remove()

      this.game.set({status:"active"})

      //generate chatrooms
      
      /*
      _.each(this.game.get('players').permutations(), function(pair){
        this.game.get('chatrooms').create({players: [pair[0].id, pair[1].id]})
      }, this);
      
      */
      this.game.save()

      new BoardView(this.game)
    }
  });

  var PlayerList = Backbone.View.extend({
    template: T['players_pregame'],
    events: {
      "click .boot": "bootPlayer"
    },
    initialize: function(options){
      this.game = options.game;

      options.target.append(this.el);

      this.game.get('players').bind("remove", this.render, this)
      this.game.get('players').bind("add", this.render, this)
      this.game.get('players').bind("change", this.render, this)

      this.render();
    },
    render: function(){
      $(this.el).html("");
      this.game.get('players').each(function(player){this.addOne(player)}, this);
    },
    addOne: function(player){
      $(this.el).append(this.template.r({player:player.toData(),player_id:player.id}));
    },
    bootPlayer: function(e){
      var boot_id = $(e.currentTarget).attr("data-id");

      players = this.game.get('players')
      players.remove(players.get(boot_id))
    }
  });

  var PowerList = Backbone.View.extend({
    template: T['powers_pregame'],
    events: {
      "click .power": "selectPower"
    },
    initialize: function(options){
      this.game = options.game;

      options.target.append(this.el);

      this.game.get('players').bind("remove", this.render, this)
      this.game.get('players').bind("add", this.render, this)
      this.game.get('players').bind("change", this.render, this)

      this.render();
    },
    render: function(players){
      //assemble power dict for template
      available_powers = _.difference(
          PLAYERS,
          this.game.get('players').map(function(player){ return player.get('power')})
        );

      data = {powers:available_powers.map(function(p){return {name:p}})}

      $(this.el).html(this.template.r(data));
    },
    selectPower: function(ev){
      //user_selected, other_selected, selectable
      var power = $(ev.currentTarget).attr('data-power') //('class').split(' ').filter(function(element){return ($.inArray(element,PLAYERS)!=-1)})[0]
     

      // if power available
      if(undefined == this.game.get('players').find(function(player){player.get('power') == power})   ){
        // assign it to current user

        choosing_player = this.game.get('players').ownedBy(window.user)

        if(choosing_player != undefined){
          choosing_player.set({'power':power});
          choosing_player.save();
        } else {
          // if user not part of game, add user to game
          this.game.get('players').create({power: power, user: window.user});
        }
      }

      this.render();
    }
  });

  /*
  window.PreGameView = Backbone.View.extend({
    //id: this.id,
    events: {
      
      "click .selectable": "selectPower",
      "click .startGame": "startGame",
      
    },
    initialize: function(options){
      
      

      console.log('initializing pregame')

      this.playerlist = new PlayerList(this.game.get('players'));
      this.powerlist = new PowerList(this.game.get('players'));

      this.game.get('players').bind("change", function(){this.playerlist.render(this.game.get('players'))}, this)
      this.game.get('players').bind("change", function(){this.powerlist.render(this.game.get('players'))}, this)

      this.parentView = this.options['parentView']

      console.log(this.el)
      this.render();

      return this;
    },
    render: function(){

      console.log('rendering pregame')
      
      
      $(this.el).html(this.template.r({}));

      this.playerlist.render(this.game.get('players'));
      this.powerlist.render(this.game.get('players'));

      $(this.el).show()

    },
    startGame: function(ev){
      $(this.el).remove()
      this.game.set({status:"active"})
      //generate chatrooms
      _.each(this.game.get('players').permutations(), function(pair){
        this.game.get('chatrooms').create({players: [pair[0].id, pair[1].id]})
      }, this);
      this.game.save()
      new BoardView(this.game)
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
      $(this.anchor).append(this.el);
    },
    render: function(players){
      //assemble power dict for template
      available_powers = _.difference(
          PLAYERS,
          players.map(function(player){ return player.get('power')})
        );

      /*

      var powerdict = [];
      PLAYERS.forEach(function(power){
        var state = 'selectable';
        //iterate through powers, if power taken by player, assign state
        if (_.any(players.models, function(player){return player.get('power') == power})) 
          state='player_selected';
        powerdict.push({name: power, select_state:state})
      });*//*
      data = {powers:available_powers.map(function(p){return {name:p}})}
      console.log(data)
      console.log(this.template.r(data));
      console.log(this.el)


      $(this.el).html(this.template.r(data));
    }

  });
*/

});