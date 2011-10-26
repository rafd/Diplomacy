define([
  "scripts/vendor/underscore.min.js"
  , "scripts/vendor/backbone.min.js"
  , "scripts/vendor/backbone-localstorage.js"
  , "scripts/vendor/ICanHaz.min.js"
  , "socket.io"
], function(){

  window.Socket = io.connect('/', {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    });

});