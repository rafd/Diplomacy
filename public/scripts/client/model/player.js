define(['scripts/client/bootstrap.js'], function(){

  window.Player = Backbone.RelationalModel.extend({
    urlRoot: 'players',
    relations: [
      {
        type: 'HasOne',
        key: 'user',
        relatedModel: 'RemoteUser',
        includeInJSON: true
      },
      {
        type: 'HasMany',
        key: 'units',
        relatedModel: 'Unit',
        includeInJSON: false
      }
    ],
  })

  window.PlayerCollection = Backbone.Collection.extend({
    model: Player
  });

});