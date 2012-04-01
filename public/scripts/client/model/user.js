define(['scripts/client/bootstrap.js'], function(){

  window.User = Backbone.RelationalModel.extend({
    urlRoot: 'user',
    initialize: function(spec){
      
    }
  });

  USER_NAMES = ["Canna","Cliff","Evert","Franz","Joe","Kirill","Mark","Max","Raf","Winston","Woodrow"]

  UserCollection = Backbone.Collection.extend({
    model:User,
    url:'user',
    mock: function(){
      for(i in USER_NAMES){
        NAME = USER_NAMES[i];
        this.create({name:NAME + " " + Math.floor(Math.random()*100), slug:NAME.toLowerCase() });
      }
    }
  });

});