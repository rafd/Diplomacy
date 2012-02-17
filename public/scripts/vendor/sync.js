(function(){

  getValue = function getValue(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  function H4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
 
  function guid() {
    return (Math.floor(new Date().getTime()/1000).toString(16)+H4()+H4()+H4()+H4());
  }

  dropsync = {
    create: function(model,url,options){
      if (!model[Backbone.Model.prototype.idAttribute]) model[Backbone.Model.prototype.idAttribute] = model.attributes[Backbone.Model.prototype.idAttribute] = guid();

      socket.emit('db',{action:'POST', collection:url, data:model}, function(err,data){ })

      options.success(model);
    },
    update: function(model,url,options){
      socket.emit('db',{action:'update', collection:url, data:model}, function(err,data){ })

      options.success(model);
    },
    getAll: function(model,url,options){
      socket.emit('db',{action:'GET', collection:url}, function(err,data){ options.success(data); })
    },
    get: function(model,url,options){
      socket.emit('db',{action:'GET', collection:url, data:model.id}, function(err,data){ options.success(data); })
    }
  }

  Backbone.sync = function(method, model, options) {
    url = getValue(model, 'urlRoot') || getValue(model, 'url');

    // console.log(method+((method=="read" && !model.id) ? "(all)" : "")+":"+url)

    switch (method) {
      case "read":    resp = model.id ? dropsync.get(model,url,options) : dropsync.getAll(model,url,options); break;
      case "create":  resp = dropsync.create(model,url,options);                                      break;
      case "update":  resp = dropsync.update(model,url,options);                                      break;
      case "delete":  resp = dropsync.destroy(model,url,options);                                     break;
    }

  };
})();
