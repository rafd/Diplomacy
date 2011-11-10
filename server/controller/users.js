function controller(io,_und) {

  store = {}

  var derp = io.sockets.on('connection', function(socket){
    socket.on('create', function (data, callback) {

      if(data.nested != true){
        if(typeof store[data.class] == "undefined") store[data.class] = {}
        store[data.class][data.model._id] = data.model

        console.log(store)
      }

      setTimeout(function () {
        callback(null, JSON.stringify(data.model));
      }, 5000)

      
    });

    socket.on('read', function (data, callback) {
      var result = null

      if(data.model.length == 0){
        //read all
        result = _und.values(store[data.class]);
      } else {
        //read one
        if(typeof store[data.class] == "undefined") store[data.class] = {}
        result = store[data.class][data.model._id];
      } 
      console.log(store)
      callback(null, JSON.stringify(result || {}));

    });

    socket.on('update', function (data, callback) {

      if(typeof store[data.class] == "undefined") store[data.class] = {}
      store[data.class][data.model._id] = data.model

      console.log(store)

      callback(null, JSON.stringify(data.model));

    });

    socket.on('delete', function (data, callback) {
      delete store[data.class][data.model._id]

      callback(null, JSON.stringify(data.model));
    }); 
    
    socket.on('ping', function (data, callback) {
      callback(null, 'pong');
    }); 

  });

}

module.exports.controller = controller;