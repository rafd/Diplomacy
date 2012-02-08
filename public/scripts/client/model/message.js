define(['scripts/client/bootstrap.js'], function(){

  window.Message = Backbone.RelationalModel.extend({
    urlRoot: "message",
    nested: true,
    initialize: function(spec){
      this.set({
        htmlId: 'message_' + this.cid,
        created_at: this.get('created_at') || new Date().getTime()
      });
    }
  });

  window.Messages = Backbone.Collection.extend({
    model: Message
  });

});