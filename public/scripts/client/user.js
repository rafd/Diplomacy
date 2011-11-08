define(['scripts/client/bootstrap.js'], function(){

  window.User = Backbone.RelationalModel.extend({
    urlRoot: 'user',
    initialize: function(spec){
      this.set({
        name: this.get('name') || Math.floor(Math.random()*1001)
      });
    },
    join_chat: function(){
      Socket.emit('chat:connect', this.toJSON());
    }
  });

  window.Players = Backbone.Collection.extend({
    model: User
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