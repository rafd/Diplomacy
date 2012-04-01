define(['scripts/client/bootstrap.js'], function(){
  initialize = function(){

    socket_defaults = {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    };

  
    window.socket = io.connect('/', socket_defaults);


    window.sign_in = function() { }

    PLAYERS = ["Eng","Aus","Fra","Ger", "Ita", "Rus", "Tur"];
    PROVINCES = ["NAt","Nrg","Nth","Cly","Edi","Lvp","Yor","Wal","Lon","Iri"];


    Splash = new SplashView();


    
  }


});