define(['scripts/client/bootstrap.js'], function(){
  
  LobbyView = Backbone.View.extend({
    template: T['lobby'],
    className: 'lobby',
    events: {
      "click #create-game": "createGame"
    },
    initialize: function(){
      $(this.el).html(this.template.r({}));

      this.input = $(this.el).find("form #new-game-input");
      
      $('#diplomacy').append(this.el);

      GamesList = new GamesView();
    },
    createGame: function(e){
      var name = this.input.val();

      g = Games.create({name:name});
      //Socket.emit('game:create', g.toJSON());

      this.input.val('');
      return false;
    },
  });

  GameView = Backbone.View.extend({
    tagName: 'div',
    template: T['game'],
    events: {
      "click a": "switchToGame"
    },
    switchToGame: function(){
      this.hideLobby();

      window.currentGameView = new BoardView({model:this.model});
    },
    hideLobby: function() {
      $(".lobby").hide();
    },
    render: function(){
      $(this.el).html(this.template.r([this.model.toJSON()]));
      return this;
    }
  });

  window.GamesView = Backbone.View.extend({
    className: 'games',
    events: {
      
    },
    initialize: function(){
      this.render();

      Games.bind('reset', this.addAll, this);
      Games.bind('add', this.addOne, this);

      Games.fetch();
    },
    render: function(){
      $(".lobby").append(this.el);
      return this;
    },
    addOne: function(g){
      var view = new GameView({model: g});
      $('.games').append(view.render().el);
    },
    addAll: function(){
      $(this.el).html('');
      Games.each(this.addOne);
    },
    update_from_server: function(){
      Socket.emit('game:getAll', function(data){
        if(data.length == 0 || Games.length == 0 || (_.last(data).created_at != Games.last().get('created_at'))){
          l = Games.models.length
          for(i=0;i<l;i++){
            Games.models[0].destroy();
        }
        Games.reset();

        _.each(data, function(d){Games.create(d)});
        } else {
          console.log('up to date')
        }
      });
    }
  });

});