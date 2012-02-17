define(['scripts/client/bootstrap.js'], function(){
  
  LobbyView = Backbone.View.extend({
    template: T['lobby'],
    className: 'lobby',
    events: {
      "click #create-game": "createGame"
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
      $(this.el).html(this.template.r({}));

      this.input = $(this.el).find("form #new-game-input");
      
      $('#diplomacy').append(this.el);

      new GamesView($(this.el));
      new UserView($(this.el));
      new RemoteUserList($(this.el));
    },
    createGame: function(e){
      var name = this.input.val();

      g = Games.create({name:name});
      console.log(g.toData())
      this.input.val('');
      return false;
    },
  });


  UserView = Backbone.View.extend({
    className: 'user',
    template: T['user'],
    initialize: function(target){
      $(this.el).html(T['user'].r(window.user.toData()));
      target.append(this.el);
    }
  });

  GameView = Backbone.View.extend({
    tagName: 'div',
    template: T['game'],
    events: {
      "click a": "switchToGame"
    },
    initialize: function() {
      this.model.get('players').bind("change", this.render, this);
      var gameView =  new PreGameView({model:this.model, parentView: this});
    },
    switchToGame: function(){
      this.hideLobby();
      window.currentGameView = this.model.get('gameView') //remove from model
      $(this.gameView.el).show()
      // window.currentGameView = new PreGameView({model:this.model});
      // window.currentGameView = new BoardView({model:this.model});
    },
    hideLobby: function() {
      $(".lobby").hide();
    },
    render: function(){
      $(this.el).html(this.template.r(this.model.toData()));
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
      RemoteUsers.bind('add', this.render, this);
      RemoteUsers.bind('reset', this.render, this);

      target.append(this.el);
      this.render();
    },
    render: function(){
      $(this.el).html(this.template.r({users:RemoteUsers.toJSON()}));
    }

  });



});