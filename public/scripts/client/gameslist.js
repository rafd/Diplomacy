define(['scripts/client/bootstrap.js'], function(){

  Game = Backbone.Model.extend({
    initialize: function(spec){
      this.set({
        //htmlID: 'game_' + this.cid,
        created_at: this.get('created_at') || new Date().getTime()
      });
    }
  });

  GameView = Backbone.View.extend({
    tagName: 'div',
    template: _.template("<a href='#' class='game-link'><%- name %> </a>"),
    renderLink: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  window.Games = new (Backbone.Collection.extend({
    model: Game,
    localStorage: new Store("games")
    
  }))();

  GamesListView = Backbone.View.extend({
    el: $("#lobby"),
    events: {
      "click #create-game": "createGame"
    },

    initialize: function(){
      this.input = $("form #new-game-input");
      Games.bind('reset', this.addAll, this);
      Games.bind('add', this.addOne, this);

      Games.fetch({
        success: function(){
          console.log('localstore game pull success')
        }
      });

      Socket.on('game:create', function(data){
        Games.create(data);
      });
    },

    addOne: function(g){
      var view = new GameView({model: g});
      $("#gameslist").append(view.renderLink().el);
    },

    addAll: function(){
      $("#gameslist").html('');
      Games.each(this.addOne);
    },

    createGame: function(){
      var name = this.input.val();
      g = Games.create({name:name});
      //Socket.emit('game:create', g.toJSON());

      var temp = {'collection':'game', 'action':'POST', 'data':g.toJSON()}
      Socket.emit('db', temp);

      this.input.val('');
      return false;
    },

    deleteGame: function(){
      
    }

    update_from_server: functhttps://www.google.com/search?client=ubuntu&channel=fs&q=mongoose+remove&ie=utf-8&oe=utf-8https://www.google.com/search?client=ubuntu&channel=fs&q=mongoose+remove&ie=utf-8&oe=utf-8https://www.google.com/search?client=ubuntu&channel=fs&q=mongoose+remove&ie=utf-8&oe=utf-8ion(){
      //Socket.emit('game:getAll', function(data){

      var temp = {'collection': 'game', 'action':'GET'}
      Socket.emit('db', temp, function(data){
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
  window.GamesList = new GamesListView();
});