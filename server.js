var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express.createServer(express.logger())
  , io = require('socket.io').listen(app);

var chat=[], users={};

app.configure(function(){
  app.set('views', __dirname + '/server/views');
  app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: function (str, path){
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib());
    }
  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

io.configure("development", function () { 
  io.set("log level", 1); 
});

io.configure("production", function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.configure("test", function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

app.dynamicHelpers({
  env: function(req, res){
    return app.settings.env;
  }
});

// ROUTES

app.get('/', function(req, res) {
  res.render('app.jade', {title: 'Diplomacy'});
});

app.get('/test', function(req, res) {
  res.render('test.jade', {title: 'Diplomacy'});
});

io.sockets.on('connection', function (socket) {
  socket.on('chat:message', function (data) {
    chat.push(data);
    // broadcast the message
    console.log('message received');
    socket.broadcast.emit('chat:message', data);
  });

  socket.on('chat:connect', function(user){
    console.log('welcome '+user.name);
    socket.user_id = user.id;
    users[user.id] = user;
    //TODO: send updates, based on when last online
    //socket.emit('game:updates',data)
    socket.emit('chat:users',users);
    socket.broadcast.emit('chat:users',users);
  });

  socket.on('chat:getAll',function(callback){
    callback(chat);
  });

  socket.on('disconnect', function(){
    console.log('bye bye '+socket.user_id);
    delete users[socket.user_id];
    console.log(users);
    socket.emit('chat:users',users);
    socket.broadcast.emit('chat:users',users);
  });

});

// RUN

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});
