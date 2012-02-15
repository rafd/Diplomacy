define(['scripts/client/bootstrap.js'], function(){

  window.Player = Backbone.RelationalModel.extend({
    urlRoot: 'player',
    initialize: function(){
      this.attributes.units = function() {
        //TODO; issue: player has no ref to game
      }
    },
    relations: [
      {
        type: 'HasOne',
        key: 'user',
        relatedModel: 'User',
        collectionType: 'UserCollection',
        includeInJSON: Backbone.Model.prototype.idAttribute
      },
      {
        type: 'HasMany',
        key: 'orders',
        relatedModel: 'Order',
        includeInJSON: Backbone.Model.prototype.idAttribute,
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'player'
        }
      },
      {
        type: 'HasMany',
        key: 'chatrooms',
        relatedModel: 'ChatRoom',
        includeInJSON: Backbone.Model.prototype.idAttribute
      },
      {
        type: 'HasMany',
        key: 'messages',
        relatedModel: 'Message',
        includeInJSON: Backbone.Model.prototype.idAttribute,
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'player'
        }
      }
    ],
  });

  window.PlayerCollection = Backbone.Collection.extend({
    model: Player,
    url: 'player',
    ownedBy: function(user){
      return this.find(function(player){
        return player.get('user') == user;
      });
    }
  });  


});