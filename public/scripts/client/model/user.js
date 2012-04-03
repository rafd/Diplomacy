define(['scripts/client/bootstrap.js'], function(){

  window.User = Backbone.RelationalModel.extend({
    urlRoot: 'user',
    initialize: function(spec){
      console.log(spec.slug)
      if(spec.slug == undefined){
        if(USER_NAMES.indexOf(spec.name.split(" ")[0]) == -1)
          spec.slug = "cat"+Math.floor(Math.random()*4)

        this.set({
          slug: spec.slug || spec.name.toLowerCase()
        });

        this.save();
      }
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