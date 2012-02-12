(function(){

  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };

  function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  };

  dropsync = {
    create: function(model){
      if (!model.id) model.id = model.attributes.id = guid();
      return model;
    },
    findAll: function(){
      return [];
    },
    find: function(model){
      
    }

  }

  Backbone.sync = function(method, model, options) {

    console.log(method)
    console.log(model)

    switch (method) {
      case "read":    resp = model.id ? dropsync.find(model) : dropsync.findAll(); break;
      case "create":  resp = dropsync.create(model);                               break;
      case "update":  resp = dropsync.update(model);                               break;
      case "delete":  resp = dropsync.destroy(model);                              break;
    }

    if (resp) {
      options.success(resp);
    } else {
      options.error("Record not found");
    }

  };
})();
