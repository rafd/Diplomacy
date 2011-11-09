define(['scripts/client/bootstrap.js'], function(){

  window.User = Backbone.RelationalModel.extend({
    urlRoot: 'users',
    relations: [
      {
        type: 'HasMany',
        key: 'games',
        relatedModel: 'Game',
        collectionType: 'Games',
        includeInJSON: Backbone.Model.prototype.idAttribute
      }
    ],
    initialize: function(spec){
      this.set({
        name: this.get('name') || Math.floor(Math.random()*1001)
      });
    },
    join_chat: function(){
      Socket.emit('chat:connect', this.toJSON());
    }
  });

  window.Player = Backbone.RelationalModel.extend({
    urlRoot: 'players'
  })

  window.Players = Backbone.Collection.extend({
    model: Player
  });
  /*
  window.CurrentUser = new (Backbone.Collection.extend({
    model: User,
    initialize: function() {
      this.fetch();
    }
  }))();
  */

});