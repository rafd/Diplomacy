define(['scripts/client/bootstrap.js'], function(){
  initialize = function(){

    socket_defaults = {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    };

  
    window.socket = io.connect('/', socket_defaults);

    
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

    PLAYERS = ["Eng","Aus","Fra","Ger"];
    PROVINCES = ["NAt","Nrg","Nth","Cly","Edi","Lvp","Yor","Wal","Lon","Iri"];
    USER_NAMES = ["Joe","Evert","Bob","George","Bruce","Milly","Sam","Evan","Jane","Jess","Ryan"];


    window.user = new User(random_user_specs[Math.floor(Math.random() * random_user_specs.length)]);

    window.Games = new GameCollection();


    RemoteUser = Backbone.RelationalModel.extend({
      urlRoot: 'remote_user',
      initialize: function(){
        this.set({name: Helpers.random_from(USER_NAMES)});
      }
    });

    RemoteUsers = Backbone.Collection.extend({
      model:RemoteUser
    });

    window.remote_users = new RemoteUsers();

    window.Lobby = new LobbyView();



    g = Games.create({});

    // {power:"Eng", user: user},
    
    _.each(
      ["Aus","Fra","Ger","Ita","Rus","Tur"], 
      function(_power){
        g.get('players').create({power: _power});
        ru = remote_users.create()
        g.get('players').last().set({user:ru});
      }
    );

    
  }


});