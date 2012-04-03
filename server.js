var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express.createServer(express.logger())
  , io = require('socket.io').listen(app)
  , _und = require('underscore')
  , mongoose = require('mongoose')
  , hedgehog = require('./server/lib/hedgehog')
  , fs = require('fs')
  , dipresolve = require('./server/lib/dipresolve')


var 
    MODEL_PATH  = './server/model/'
  , db_uri      = process.env.MONGOLAB_URI || 'mongodb://localhost/diplomacy-dev';

var users={};

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

// Mongoose

mongoose.connect(db_uri, function(err) {
 if (err) console.log(err);
});

// Load and instantiate models

var model = [];

fs.readdir('./server/model',function(err,files){
  if (err){
    //error
    callback(error);
  }
  files.forEach(function(file){
    //filter and trim .js
    var filename = file
    if (file.substr(-3) == '.js'){
      filename = file.replace('.js', '');
      model[filename] = require(MODEL_PATH + file).create(mongoose);
    }
  })
});

// Template Compiler

var h = new hedgehog({
  'input_path': './public/scripts/client/template',
  'output_file': './public/scripts/client/templates.js',
  'extension': '.m'
});

// ROUTES

require('./server/controller/users.js').controller(io,_und);

app.get('/', function(req, res) {
  res.render('app.jade', {title: 'Diplomacy'});
});

app.get('/test', function(req, res) {
  res.render('test.jade', {title: 'Diplomacy'});
});

var user_sockets = {};

io.sockets.on('connection', function (socket) {

  // socket.on('chat:message', function (data) {
  //   delete data.id //mongoose requires specific userid type. removed for now.
  //   ch.messages.push(data);
  //   ch.save();
  //   // broadcast the message
  //   console.log('message received');
  //   socket.broadcast.emit('chat:message', data);
  // });

  // socket.on('chat:connect', function(user){
  //   console.log('welcome '+user.name);
  //   socket.user_id = user.id;
  //   users[user.id] = user;
  //   //TODO: send updates, based on when last online
  //   //socket.emit('game:updates',data)
  //   socket.emit('chat:users',users);
  //   socket.broadcast.emit('chat:users',users);
  // });

  // socket.on('chat:getAll',function(callback){
  //   callback(ch.messages);
  // });

  // socket.on('game:create', function(data){
  //   newGame = new Game(data);
  //   newGame.save();
  // })

  // //socket.on('game:getAll', function(callback){
  // //  Game.find({}, function(err, docs){callback(docs);});
  // //})

  // socket.on('disconnect', function(){
  //   console.log('bye bye '+socket.user_id);
  //   delete users[socket.user_id];
  //   console.log(users);
  //   socket.emit('chat:users',users);
  //   socket.broadcast.emit('chat:users',users);
  // });


  socket.on('game:resolve', function(gameID, cb){
    console.log("Game resolving");
    //get units for gameID from mongoose

    var _model = model["game"];

    _model.findOne({'_id':gameID}, function(err, game){

      model["player"].find({}).where("_id").in(game.players).select('orders power').exec(function(er, data){
        //var orders=[];
        var u = game.units;
        var combined = _.flatten(_.map(data, function(doc){ return doc.orders }),true);
        var provinces_with_orders = _.map(combined, function(order){return order.province});
        var holds = _.compact(_.map(u,function(unit){ 
            if(-1 == _.indexOf(provinces_with_orders, unit.province)){
              return { 
                province: unit.province,  
                utype: unit.utype,
                owner: unit.owner,
                order: { to: unit.province, from: unit.province, move: 'h' } 
              }
            }
          })
        );
        var end = _.uniq(holds.concat(combined),false,function(u){ return u.province });
        var ret = dipresolve(end);


        //remove orders from players
        model["player"].update({"_id": {$in:game.players}}, {orders:[]}, { multi: true }, function(err,num){});
        //TODO: update game state on server
        console.log(ret);
        game.units=ret;
        game.save();
        //broadcast updated game state to all clients

        //informing client that called us
        cb(null,ret);

        

      });
    
    });

      //console.log(orders)

      /*model["game"].findOne({'_id':gameID},function(err,game){
        u = game.units;
        console.log(orders.orders)
        model["player"].findOne({'_id':orders.orders[0].player},function(err,player){console.log(player)})
        var toResolve;
        for(var x in u)
        {
          
        }

        //dipresolve(toResolve);
      });*/
      //dipresolve() game find id.game units returns hash


    //dipresolve that gameID
    
    //var blah = dipresolve(null);//fix

    //broadcast game state to all relevant clients
    //what happens if client is offline?
    //cb(null, blah);
    //model['game'].remove({_id:gameID},function(err,doc){});//remove orders
  });

  socket.on('user:login', function(args, cb){
    var _model = model['user'];

    var login = function(doc){
      user_sockets[doc._id] = socket;
      socket.set('user_id', doc._id, function(){
        cb(null,doc);
      });
    }

    _model.findOne({email: args.email}, function(err, doc){ 

      // if username exists
      if(doc){
        // if passphrase correct
        if(args.passphrase == doc.passphrase){
          login(doc)
        }
        // else (passphrase incorrect)
        else {
          // return error
          // TODO
        }
      } 
      // else (username does not exist)
      else {
        // create user
        doc = new _model(args);
        doc.save();

        // return user id
        login(doc)
      }

    });
    
  });


  socket.on('db', function(args, callback){

    /* 
      args = {
          action: "",
          collection: "",
          data: {}
      }
    */
    
    //load schema based on collection specified

    //TODO:
    //  Error Handling (record not found, collectio not found, args data not found)
    //  Automated schema loading from models folder
    //  Unit tests

    var update_other = function(user_id, other_id){
        if (user_id != other_id){
          console.log('Attempting to broadcast to:', other_id)
          if (other_id in user_sockets){
            user_sockets[other_id].emit('update:force', args);
          }  else {console.log('Broadcast failed, user not online.')}
        }
    }

    var _model = model[args.collection];

    switch(args.action){
      case 'GET':
        if (!args.data){
          //Getall
          _model.find({}, function(err, docs){callback(err,docs);});
        }
        else {
          //Get one
          //do we use findById instead? Not sure if using mongo ids or our own.
          _model.findOne({'_id':args.data}, function(err, docs){callback(err,docs);});
        }
        break;
      
      case 'PUT':
        break;
      
      case 'POST':
        if (args.data){
          socket.get('user_id', function(err, user_id){
            console.log('create', args.collection,'from:', user_id);
            console.log(args.data)
          })
          //create new post in collection
          args.data._id =  mongoose.Types.ObjectId.fromString(args.data._id);
          newEntry = new _model(args.data);
          newEntry.save();
          //broadcast update to all players
          if (args.collection == 'game'){

            socket.broadcast.emit('update:newgame')

            // socket.broadcast.emit('update:newgame', args) 
            
            // args["game_id"] = args.data._id
            // args["user_map"] = {}
            // if (args.collection == 'game') {
            //   var private_list = ["players", "turns", "chatrooms", "order_submit"]
            //   for (key in args.data){
            //     if (_.indexOf(private_list, key) > -1) delete args.data[key]
            //   }
            // }
            // model['player'].find({'_id':{$in:args.players}}, function(err, player_list){

            //   var user_ids = []
            //   _.each(player_list, function(player){
            //     user_ids.push(player.user)
            //   })
            //   console.log(user_ids)
            //   model['user'].find({'_id':{$in:user_ids}}, function(err, user_list){

            //     //build player id to user info map
            //     _.each(player_list, function(player){
            //       args.user_map[player._id] = _.find(user_list, function(user){
            //         return (player.user == user._id)
            //       })
            //     })

            //     _.each(user_ids, function(user_id){
            //         socket.broadcast.emit('update:force', args)
            //     });

            //   })


            // });


          }
        }
        break;

      case 'update':
        if(args.collection == 'chatroom'){ console.log('drop chat'); break;}//temporarily drop chatroom for debug
        if(args.data){

          socket.get('user_id', function(err, user_id){
            console.log('update from:', user_id, 'to:', args.collection);
          })

          var arg_id = mongoose.Types.ObjectId.fromString(args.data._id);
          delete args.data["_id"];
          _model.findOne({_id: arg_id}, function(e,doc){
            if (doc){
              _.extend(doc, args.data)
              doc.save(function cb(err){
                if (err) console.log(err);
                //save complete

/*have game id for game, naturally pull game id for player, need one for chatroom
need to pass args.game_id, args.data, args.collection

*/

//user will only send own player obj
//game will send game status, player stuff?
//chatroom?

/*
user
chatrooms other player's chatrooms
messages other player's messages
power
timestamps
_id same id
*/

                    //Broadcast update to other players in game
                    // console.log(args.collection, id, args.data)
                    
                      // console.log(args.data)
                var player_list = null
                if (args.collection == 'player') player_id = mongoose.Types.ObjectId.toString(arg_id)
                else player_id = args.data.players[0]
                model['game'].findOne({'players': player_id}, function(err, game){
                  console.log(args.data)
                  args["game_id"] = game._id
                  args.data["_id"] = arg_id
                  args["user_map"] = {}
                  if (args.collection == 'player') {
                    //remove stuff we don't send to other players
                    var private_list = ["orders", "chatrooms", "messages", "user"]
                    for (key in args.data){
                      if (_.indexOf(private_list, key) > -1) delete args.data[key]
                    }
                  }
                  if (args.collection == 'game') {
                    var private_list = ["players", "units", "turns", "chatrooms", "order_submit"]
                    for (key in args.data){
                      console.log(key)
                      if (_.indexOf(private_list, key) > -1) delete args.data[key]
                    }
                  }
                  model['player'].find({'_id':{$in:game.players}}, function(err, player_list){

                    var user_ids = []
                    _.each(player_list, function(player){
                      user_ids.push(player.user)
                    })
                    console.log(user_ids)
                    model['user'].find({'_id':{$in:user_ids}}, function(err, user_list){

                      //build player id to user info map
                      _.each(player_list, function(player){
                        args.user_map[player._id] = _.find(user_list, function(user){
                          return (player.user == user._id)
                        })
                      })

                      _.each(user_ids, function(user_id){
                        socket.get('user_id', function(err, data){
                          update_other(data, user_id);
                        });
                      });

                    })


                  });
                });
              });
            } 
            else console.log('no doc to update');
          });
        }
        break;
      
      case 'DELETE':
        if (args.data){
          console.log(args);
          _model.remove({_id:args.data}, function(err, docs){callback(err,docs);});
        }
        break;
    }
    
  });

  socket.on('disconnect', function(){
    socket.get('user_id', function(err, user_id){
      delete user_sockets[user_id];
    });
  });

});

  

// RUN

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});
