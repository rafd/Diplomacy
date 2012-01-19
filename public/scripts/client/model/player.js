define(['scripts/client/bootstrap.js'], function(){

  window.Player = Backbone.RelationalModel.extend({
    urlRoot: 'players',
    relations: [
      {
        type: 'HasOne',
        key: 'user',
        relatedModel: 'RemoteUser',
        includeInJSON: true
      }
    ],
  })

  window.Players = Backbone.Collection.extend({
    model: Player
  });

});