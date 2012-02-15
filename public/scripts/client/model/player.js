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
    },
    permutations: function(){
      // for every item 1..x as i
        // for every item 1..i-1 as j
          // output << [item i, item j]

      output = []

      for(i=0; i < this.length; i++){
        for(j=0; j < i; j++){
          output.push([this.at(i), this.at(j)])
        }
      }
      return output;
    }
  });  


});