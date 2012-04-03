define(['scripts/client/bootstrap.js'], function(){
  initialize = function(){

    socket_defaults = {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    };

  
    window.socket = io.connect('/', socket_defaults);



    socket.on('update:force', function(args, cb){
    /* 
         args = {
          collection: "",
          data: {},
          game_id: ""
      }
    */
    //player, chatroom, game

      console.log('update:force', args)

      var game = Games.find(function(game){
        return (game.get('_id') == args.game_id)
      });
      var model = null;

      // new_user = new User({})

      if (!_.isUndefined(game)){
        //LAZY WAY WOO
        //Existing object
        
        if (args.collection == 'game') {
          model = game;

        //need to create new user for remote join.

        //first check if user exists
          model.get('players').each(function(player){
            var player_id = player.get('_id')
            //remove pre-existing from queue
            if (!_.isUndefined(args.user_map[player_id])) delete args.user_map[player_id]
          })

          for (player_id in args.user_map){
            //create new players
            console.log('adding', args.user_map[player_id].name, 'to game')
            var new_user = new User(args.user_map[player_id])
            model.get('players').create({_id:player_id, power:'Aus', user:new_user})
          }
        
        } else model = game.get(args.collection + 's').find(function(sub){
          return (sub.get('_id') == args.data["_id"])
        }); //need to pluralize

        //don't update _id
        delete args.data["_id"];



        for (key in args.data){
          //{key:value} will literally set the key as 'key', so hacky workaround
          var set_hash = {}
          set_hash[key] = args.data[key]

          console.log('setting:', key, '|', model.get(key), 'to:', args.data[key])

          model.set(set_hash);
          
        }

      }
      else {
        console.log('makenew')
        // collection[args.collection].add(args.data)
      }
    });

    window.sign_in = function() { }
    
    random_user_specs = [
      {
        name: "Cliff",
        avatar: "/images/cliff.jpg"
      },
      {
        name: "Raf",
        avatar: "/images/raf.jpg"
      },
      {
        name: "Canna",
        avatar: "/images/canna.jpg"
      }
    ]

    PLAYERS = ["Eng","Aus","Fra","Ger", "Ita", "Rus", "Tur"];
    PROVINCES = ["NAt","Nrg","Nth","Cly","Edi","Lvp","Yor","Wal","Lon","Iri"];


    //window.user = new User(random_user_specs[Math.floor(Math.random() * random_user_specs.length)]);

    Splash = new SplashView();


    
  }


});