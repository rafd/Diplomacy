define(['scripts/client/bootstrap.js'], function(){

  window.Players = Backbone.Collection.extend();

	window.Game = Backbone.RelationalModel.extend({
    urlRoot: 'game',
    relations: [
      {
        type: 'HasMany',
        key: 'chatrooms',
        relatedModel: 'ChatRoom',
        collectionType: 'ChatRooms',
        includeInJSON: Backbone.Model.prototype.idAttribute
      },
      {
        type: 'HasMany',
        key: 'players',
        relatedModel: 'User',
        collectionType: 'Players',
        includeInJSON: Backbone.Model.prototype.idAttribute
      }
    ],
    initialize: function(spec){

      this.get('chatrooms').create();
      this.get('chatrooms').create();

      this.set({
        created_at: this.get('created_at') || new Date().getTime()
      });
    }

  });

  window.Games = Backbone.Collection.extend({
    model: Game
  });


});