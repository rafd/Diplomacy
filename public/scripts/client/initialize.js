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

    PLAYERS = ["Eng","Aus","Fra","Ger", "Ita", "Rus", "Tur"];
    PROVINCES = ["NAt","Nrg","Nth","Cly","Edi","Lvp","Yor","Wal","Lon","Iri"];
    USER_NAMES = ["Joe","Evert","Bob","George","Bruce","Milly","Sam","Evan","Jane","Jess","Ryan"];


    window.user = new User(random_user_specs[Math.floor(Math.random() * random_user_specs.length)]);



    RemoteUser = Backbone.RelationalModel.extend({
      initialize: function(){
        this.set({name: Helpers.random_from(USER_NAMES)});
      }
    });

    RemoteUsers = Backbone.Collection.extend({
      model:RemoteUser
    });

    window.remote_users = new RemoteUsers();

    window.Lobby = new LobbyView();

    Games.create({
      players: [
        {power:"Eng", user: remote_users.create()},
        {power:"Aus", user: remote_users.create()},
        {power:"Fra", user: remote_users.create()},
        {power:"Ger", user: remote_users.create()},
        {power:"Ita", user: remote_users.create()},
        {power:"Rus", user: remote_users.create()},
        {power:"Tur", user: remote_users.create()}
      ]
    });
    


    
  }


});