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

      this.render();
    },
    render: function(){
      $('#diplomacy').append(this.el);

      new GamesView($(this.el));
      new DashView($(this.el));
    }
  });

  DashView = Backbone.View.extend({
    className: 'dash',
    template: T['dash'],
    events: {
       "click #create-game": "createGame"
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
    },
    switchToGame: function(){
      $(".lobby").hide();

      if(this.model.get('status') == "pregame"){
        //check if player existing
        console.log(this.model.get('players').toData())
        player_joined = this.model.get('players').any(function(player){return player.get('user').id == window.user.id})
        console.log(player_joined)
        if (!player_joined){
          this.model.get('players').create({power:"Aus", user: window.user})
          this.model.save()
          console.log(this.model.get('players').toData())
        }


        new PreGameView(this.model, this);
      }
      else if(this.model.get('status') == "active")
       new BoardView(this.model)

      },
    render: function(){
      var player = this.model.get('players').ownedBy(user);
      var power = null;
      if(player)
        power = player.get('power');

      game_players = this.model.get('players').map(function(p){ if(p.get('power') != power) return p.toData()});
      $(this.el).html(this.template.r({game:this.model.toData(),game_players:game_players,user_power:power}));
      return this;
    }
  });

  window.GamesView = Backbone.View.extend({
    className: 'games',
    events: {
      
    },
    initialize: function(target){
      this.render(target);

      Games.bind('reset', this.addAll, this);
      Games.bind('add', this.addOne, this);
    },
    render: function(target){
      target.append(this.el);
      return this;
    },
    addOne: function(g){
      var view = new GameView({model: g});
      $('.games').append(view.render().el);
    },
    addAll: function(){
      $(this.el).html('');
      Games.each(this.addOne);
    }
  });

  RemoteUserList = Backbone.View.extend({
    template: T['users'],
    initialize: function(target){
      
    },
    render: function(){
      $(this.el).html(this.template.r({}));
    }

  });



});