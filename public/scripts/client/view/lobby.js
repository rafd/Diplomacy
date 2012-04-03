define(['scripts/client/bootstrap.js'], function(){
  
  LobbyView = Backbone.View.extend({
    className: 'lobby',
    events: {
     
    },
    initialize: function(){
      window.RemoteUsers = new UserCollection();

      RemoteUsers.fetch({success:function(){ 
        if(RemoteUsers.length < 10){
          RemoteUsers.mock();
        }
      }});

      window.Games = new GameCollection();
      Games.fetch();

      window.socket.on('update:newgame', function(){
        Games.fetch();
      })


      this.render();
      
    },
    render: function(){
      $('#diplomacy').append(this.el);

      new GamesView($(this.el), Games);

      new DashView($(this.el));
    }
  });

  DashView = Backbone.View.extend({
    className: 'dash',
    template: T['dash'],
    events: {
       "click #create-game": "createGame",
       "click .logout": "logOut"
    },
    createGame: function(e){
      g = Games.create();
      return false;
    },
    initialize: function(target){
      RemoteUsers.bind('add', this.render, this);
      RemoteUsers.bind('reset', this.render, this);

      target.append(this.el);
      this.render();
    },
    render: function(){
      $(this.el).html(this.template.r({user:window.user.toData(),users:RemoteUsers.toJSON()}));
    },
    logOut: function(){

      delete localStorage['name'];
      location.reload()
      /*     
      $('.lobby').remove();

      window.Splash = new SplashView();
      */
    }
  });

  GameView = Backbone.View.extend({
    tagName: 'div',
    className: 'game',
    template: T['game'],
    events: {
      "click a": "switchToGame"
    },
    initialize: function() {
      this.model.get('players').bind("change", this.render, this);
      this.model.get('players').bind("remove", this.render, this);
      this.model.get('players').bind("add", this.render, this);
      this.model.get('players').bind("add:user", this.render, this);
    },
    switchToGame: function(){
      $(".lobby").hide();

      if(this.model.get('status') == "pregame"){
        new PreGameView({game:this.model});
      }
      else if(this.model.get('status') == "active"){
        new BoardView(this.model)
      }

      },
    render: function(){
      var player = this.model.get('players').ownedBy(user);
      var power = null;
      if(player)
        power = player.get('power');

      game_players = this.model.get('players').map(function(p){ if(p.get('power') != power) return p.toData()});
      $(this.el).html(this.template.r({game:this.model.toData(), turn:this.model.turnLabel(),game_players:game_players,user_power:power}));

      if(undefined != this.model.get('players').ownedBy(window.user)){
        $(this.el).appendTo('.games .my_games');
      } else {
        $(this.el).appendTo('.games .other_games');
      }
      return this;
    }
  });

  window.GamesView = Backbone.View.extend({
    className: 'games',
    template: T['games'],
    events: {
      
    },
    initialize: function(target, games, title){
      target.append(this.el);

      this.games = games;

      $(this.el).html(this.template.r({}));

      this.games.bind('reset', this.addAll, this);
      this.games.bind('add', this.addOne, this);
    },
    addOne: function(g){
      var view = new GameView({model: g});
      if(undefined != g.get('players').ownedBy(window.user)){
        $('.games .my_games').append(view.render().el);
      } else {
        $('.games .other_games').append(view.render().el);
      }
    },
    addAll: function(){
      $(this.el).html(this.template.r({}));
      this.games.each(this.addOne);
    }
  });



});