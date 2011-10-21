var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express.createServer(express.logger());

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

app.dynamicHelpers({
  env: function(req, res){
    return app.settings.env;
  }
});

// ROUTES

app.get('/', function(req, res) {
  res.render('app.jade', {title: 'Diplomacy'});
});

app.get('/canna', function(req, res) {
  r=req;
  res.render('canna');
});

// RUN

var port = process.env.PORT || 3000;

app.listen(port, function() {
  //console.log("Listening on " + port);
});