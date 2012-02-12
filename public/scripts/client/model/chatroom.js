define(['scripts/client/bootstrap.js'], function(){

  window.ChatRoom = Backbone.RelationalModel.extend({
    urlRoot: "chatroom",
    relations: [
      {
        type: 'HasMany',
        key: 'messages',
        relatedModel: 'Message',
        collectionType: 'MessageCollection',
        includeInJSON: Backbone.Model.prototype.idAttribute
      },
      {
        type: 'HasMany',
        key: 'players',
        relatedModel: 'Player',
        includeInJSON: Backbone.Model.prototype.idAttribute
      }
    ],
    initialize: function(spec){
      if(spec['_id'] == undefined) {
        this.get('messages').create({content:"Welcome",username:"000"});
      } 

      this.bind("change:messages", function(){this.fetchRelated('messages')}, this);
      this.bind("add:messages", function(){this.save()}, this);
    }
  });

  ChatRoomCollection = Backbone.Collection.extend({
    url: 'chatroom',
    model: ChatRoom
  });

});