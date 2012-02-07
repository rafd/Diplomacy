define(['scripts/client/bootstrap.js'], function(){
  
  window.Order = Backbone.RelationalModel.extend({
    urlRoot: 'turns',
    initialize: function(spec){
      
    }
  });

  OrderCollection = Backbone.Collection.extend({
    model: Order,
    url: "turns"
  });


});