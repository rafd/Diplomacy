define(['scripts/client/bootstrap.js'], function(){

  window.User = Backbone.RelationalModel.extend({
    urlRoot: 'user',
    initialize: function(spec){
      
    }
  });

  USER_NAMES = ["Joe","Evert","Bob","George","Bruce","Milly","Sam","Evan","Jane","Jess","Ryan"];


  UserCollection = Backbone.Collection.extend({
    model:User,
    url:'user',
    mock: function(){
      for(i in USER_NAMES){
        this.create({name:USER_NAMES[i] + " " + Math.floor(Math.random()*100)});
      }
    }
  });

});