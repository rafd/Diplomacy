define([
  "order!scripts/vendor/underscore.min.js"
  , "order!scripts/vendor/backbone.min.js"
  , "order!scripts/vendor/localstorage.js"
  , "scripts/vendor/hogan.js"
  , "socket.io"
], function(){

  window.Socket = io.connect('/', {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    });

});