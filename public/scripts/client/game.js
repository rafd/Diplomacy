define(['scripts/client/bootstrap.js'], function(){

  window.Players = Backbone.Collection.extend();

	window.Game = Backbone.RelationalModel.extend({
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
        relatedModel: 'Player',
        collectionType: 'Players',
        includeInJSON: Backbone.Model.prototype.idAttribute
      }
    ],
    initialize: function(spec){

      if(spec.chatrooms){
        _.each(spec.chatrooms, function(id) {
          this.get('chatrooms').create({_id:id});
        }, this);
      } else {
        this.get('chatrooms').create();
        this.get('chatrooms').create();
      }

      if(spec.players){
        _.each(spec.players, function(id) {
          this.get('players').create({_id:id});
        }, this);
      } else {
        this.get('players').create();
      }

      this.set({
        created_at: this.get('created_at') || new Date().getTime()
      });
      
    },


  });

  window.Games = Backbone.Collection.extend({
    url: 'games',
    model: Game
  });


});