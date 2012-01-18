define(['scripts/client/bootstrap.js'], function(){
  initialize = function(){
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




    RemotePlayer = Backbone.Model.extend({
      initialize: function(){
        this.set({name: Helpers.random_from(USER_NAMES)});
      }
    });

    window.Lobby = new LobbyView();

    Games.create({
      players: [new RemotePlayer(),new RemotePlayer(),new RemotePlayer(),new RemotePlayer(),new RemotePlayer(),new RemotePlayer(),new RemotePlayer()]
    });
    


    
  }


});