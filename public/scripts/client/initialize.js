define(['scripts/client/bootstrap.js'], function(){
  initialize = function(){

    socket_defaults = {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    };

  
    window.socket = io.connect('/', socket_defaults);


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

    PLAYERS = ["Eng","Aus","Fra","Ger"];
    PROVINCES = ["NAt","Nrg","Nth","Cly","Edi","Lvp","Yor","Wal","Lon","Iri"];


    window.user = new User(random_user_specs[Math.floor(Math.random() * random_user_specs.length)]);

    window.Games = new GameCollection();

    Games.fetch();

    window.RemoteUsers = new RemoteUserCollection();

    RemoteUsers.fetch({success:function(){ 
      if(RemoteUsers.length == 0){
        RemoteUsers.mock();
      }
    }});


    window.Lobby = new LobbyView();


    
  }


});