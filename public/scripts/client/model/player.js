define(['scripts/client/bootstrap.js'], function(){

  window.Player = Backbone.RelationalModel.extend({
    urlRoot: 'player',
    relations: [
      {
        type: 'HasOne',
        key: 'user',
        relatedModel: 'User',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'player'
        }
      },
      {
        type: 'HasMany',
        key: 'units',
        relatedModel: 'Unit',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'player'
        }
      },
      {
        type: 'HasMany',
        key: 'orders',
        relatedModel: 'Order',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'player'
        }
      },
      {
        type: 'HasMany',
        key: 'chatrooms',
        relatedModel: 'ChatRoom',
        includeInJSON: 'id'
      },
      {
        type: 'HasMany',
        key: 'messages',
        relatedModel: 'Message',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'player'
        }
      }
    ],
  });

  window.PlayerCollection = Backbone.Collection.extend({
    model: Player
  });  


});