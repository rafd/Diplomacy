(function(){

  getValue = function getValue(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };

  function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  };

  dropsync = {
    create: function(model){
      if (!model.id) model.id = model.attributes.id = guid();

      socket.emit('db',{action:'POST', collection:url, data:model}, function(err,data){ return data; })

      return model;
    },
    getAll: function(model,url){
      return socket.emit('db',{action:'GET', collection:url}, function(err,data){ return data; })
    },
    get: function(model,url){
      return socket.emit('db',{action:'GET', collection:url, data:model.id}, function(err,data){ return data; })
    }
  }

  Backbone.sync = function(method, model, options) {
    url = getValue(model, 'url');
    console.log(method+":"+url)

    switch (method) {
      case "read":    resp = model.id ? dropsync.get(model,url) : dropsync.getAll(model,url); break;
      case "create":  resp = dropsync.create(model,url);                                      break;
      case "update":  resp = dropsync.update(model,url);                                      break;
      case "delete":  resp = dropsync.destroy(model,url);                                     break;
    }

    if (resp) {
      options.success(resp);
    } else {
      options.error("Record not found");
    }

  };
})();
