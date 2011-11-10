(function(){

  function H4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  function guid() {
    return (Math.floor(new Date().getTime()/1000).toString(16)+H4()+H4()+H4()+H4());
  }


  /*
  var Store = function(name) {
    this.name = name;



  };

  _.extend(Store.prototype, {
    find: function(options,model){
      data = {
        class: url.split('/')[0],
        model: model.toJSON() || {}
      }

      window.socket.emit('read', data, function(err, data){
        if(err){
          options.error(err);
        } else {
          options.success(JSON.parse(data));
        }
      });
    },
    findAll: function(model){
      model
    },
    create: function(options,model){
      model.set({_id:guid()}, {silent:true});

      data = {
        class: url.split('/')[0],
        model: model.toJSON() || {}
      }

      window.socket.emit('create', data, function(err, data){
        if(err){
          //
        } else {
          console.log("save succesfull")
        }
      });

      //immediately return
      return options.success(model);
    },
    update: function(model){
      model
    },
    destroy: function(model){
      model
    }
  });
  */

  var getUrl = function(object) {
    if (!(object && object.url)) return null;
    return _.isFunction(object.url) ? object.url() : object.url;
  };


  Backbone.sync = function(method, model, options) {

    url = options.url || getUrl(model) || urlError();
    //store = new Store();

    console.log(method+":"+url)

    /*
    switch (method) {
      case "read":    resp = model.id ? store.find(options,model) : store.findAll(); break;
      case "create":  resp = store.create(options,model);                            break;
      case "update":  resp = store.update(model);                            break;
      case "delete":  resp = store.destroy(model);                           break;
    }*/

      if(method=="create") model.set({_id:guid()}, {silent:true});

      data = {
        class: url.split('/')[0],
        model: model.toJSON() || {},
        nested: model.nested
      }

      if(url.split('/').slice(-1)[0] == "messages"){ //TODO: make this generic
        //console.log(model);

        //window.current_game.get('chatrooms').get(url.split('/').slice(1)[0]).save();

        options.success(model);
      } else {
        window.socket.emit(method, data, function(err, data){
          if(err){
            //
          } else {
            console.log('response:'+method+':'+data)
            if(method == "create"){
              console.log("save succesfull");
            }
            else {
              console.log(JSON.parse(data))
              options.success(JSON.parse(data));
            }
          }
        });

        //immediately return
        if(method=="create") {options.success(model);}
      }
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
