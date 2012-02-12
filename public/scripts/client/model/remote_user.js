 define(['scripts/client/bootstrap.js'], function(){

  USER_NAMES = ["Joe","Evert","Bob","George","Bruce","Milly","Sam","Evan","Jane","Jess","Ryan"];

  RemoteUser = Backbone.RelationalModel.extend({
    urlRoot: 'remote_user',
    initialize: function(spec){
     
    }
  });

  RemoteUserCollection = Backbone.Collection.extend({
    model:RemoteUser,
    url:'remote_user',
    mock: function(){
      for(i in USER_NAMES){
        this.create({name:USER_NAMES[i] + " " + Math.floor(Math.random()*100)});
      }
    }
  });

});