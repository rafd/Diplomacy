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

      if (!_.isUndefined(game)){
        //LAZY WAY WOO
        //Existing object
        
        if (args.collection == 'game') model = game;
        else model = game.get(args.collection + 's').find(function(sub){
          return (sub.get('_id') == args.data["_id"])
        }); //need to pluralize

        for (key in args.data){
          console.log(key, model.has(key))
          //{key:value} will literally set the key as 'key', so hacky workaround
          var set_hash = {}
          set_hash[key] = args.data[key]
          var test = model.set(set_hash);
          //console.log(test.get(key), {key:args.data[key]});
          console.log('setting:', model.attributes, key, args.data[key], model.get(key))
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