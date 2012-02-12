define(['scripts/client/bootstrap.js'], function(){

  window.Message = Backbone.RelationalModel.extend({
    urlRoot: "message",
    initialize: function(spec){
      this.set({
        htmlId: 'message_' + this.cid,
        created_at: this.get('created_at') || new Date().getTime()
      });
    }
  });

  window.MessageCollection = Backbone.Collection.extend({
    url: 'message',
    model: Message
  });

});