define(['scripts/client/bootstrap.js'], function(){

  window.Player = Backbone.RelationalModel.extend({
    urlRoot: 'players'
  })

  window.Players = Backbone.Collection.extend({
    model: Player
  });

});