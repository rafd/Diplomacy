define(['scripts/client/bootstrap.js'], function(){

  window.Players = Backbone.Collection.extend();

	window.Game = Backbone.Model.extend({
    initialize: function(spec){

      this.public_chat = new ChatRoom();
      this.private_chat = new ChatRoom();
      this.players = new Players();

      this.set({
        created_at: this.get('created_at') || new Date().getTime()
      });
    }

  });

  window.Games = Backbone.Collection.extend({
    model: Game
  });


});