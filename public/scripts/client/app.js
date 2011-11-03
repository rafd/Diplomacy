define(['scripts/client/bootstrap.js'], function(){
  
  AppView = Backbone.View.extend({
    el: $("#diplomacyapp"),
    events: {
      "click .game-link": "swapView"
      , "click #exit-game": "swapView"
    },
    
    initialize: function(){
    },

    swapView: function(){
      $("#lobby").toggle();
      $("#game").toggle();
      return false;
    }
  });


  window.App = new AppView();

});