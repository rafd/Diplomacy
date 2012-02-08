define(['scripts/client/bootstrap.js'], function(){
  
  window.Turn = Backbone.RelationalModel.extend({
    urlRoot: 'turn',
    relations: [
      {
        type: 'HasMany',
        key: 'orders',
        relatedModel: 'Order',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'turn'
        }
      },
    ],
    initialize: function(spec){
      
    }
  });

  TurnCollection = Backbone.Collection.extend({
    model: Turn
  });


});