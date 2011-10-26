define([
  "vendor/order.min!scripts/vendor/underscore.min.js"
  , "vendor/order.min!scripts/vendor/backbone.min.js"
  , "vendor/order.min!scripts/vendor/localstorage.js"
  , "scripts/vendor/ICanHaz.min.js"
  , "socket.io"
], function(){

  window.Socket = io.connect('/', {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    });

});