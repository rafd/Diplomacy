define(['scripts/client/bootstrap.js'], function(){
  LobbyView = Backbone.View.extend({
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
      Socket.emit('game:create', g.toJSON());

      this.input.val('');
      return false;
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
  window.Lobby = new LobbyView();
});