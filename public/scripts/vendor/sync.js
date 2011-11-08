(function(){

  function H4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  function guid() {
    return (Math.floor(new Date().getTime()/1000).toString(16)+H4()+H4()+H4()+H4());
  }


  var Store = function(name) {
    this.name = name;



  };

  _.extend(Store.prototype, {
    find: function(){
      
    },
    findAll: function(){
      
    },
    create: function(){
      
    },
    update: function(){
      
    },
    destroy: function(){
      
    }
  });

  var getUrl = function(object) {
    if (!(object && object.url)) return null;
    return _.isFunction(object.url) ? object.url() : object.url;
  };


  Backbone.sync = function(method, model, options) {
    
    console.log(method)
    console.log(options.url || getUrl(model) || urlError());





      if(typeof model.cid != 'undefined') {
          // ..fake that it's .cid turns into a "real" .id:
          //model.unset('cid').set({_id:cid}, {silent:true});
          model.set({_id:H4()}, {silent:true});
      }


      // Oh yes, it all went sooo well ;-)
      options.success(model);
      

    /*
    var resp;
    var store = model.sync_collection || model.collection.sync_collection;

    switch (method) {
      case "read":    resp = model.id ? store.find(model) : store.findAll(); break;
      case "create":  resp = store.create(model);                            break;
      case "update":  resp = store.update(model);                            break;
      case "delete":  resp = store.destroy(model);                           break;
    }

    if (resp) {
      options.success(resp);
    } else {
      options.error("Record not found");
    } */


  };
})();
