define(['scripts/client/bootstrap.js'], function(){

  window.ChatRoom = Backbone.RelationalModel.extend({
    urlRoot: "chatroom",
    relations: [
      {
        type: 'HasMany',
        key: 'messages',
        relatedModel: 'Message',
        collectionType: 'Messages',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'chatroom'
        }
      },
      {
        type: 'HasMany',
        key: 'players',
        relatedModel: 'Player',
        includeInJSON: 'id'
      }
    ],
    initialize: function(spec){
      this.get('messages').url = "chatrooms/"+this.id+'/messages';
      if(spec.messages){
        _.each(spec.messages, function(msg) {
          this.get('messages').create(msg);
        }, this);
      } else {
        this.get('messages').create({content:"Welcome",username:"000"});
      }
      
      //this.get('messages').url = this.urlRoot + '/' + this.id + '/';
    }
  });

  ChatRoomCollection = Backbone.Collection.extend({
    model: ChatRoom,
    url: 'chatroom'
  });

});