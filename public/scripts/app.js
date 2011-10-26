require(
{
  paths: {
    "socket.io":"/socket.io/socket.io"
    ,"order":"vendor/order.min"
  }
},
[
  "jquery"
  ,"scripts/client/bootstrap.js"
  ,"scripts/client/chat.js"
  ,"scripts/client/event_log.js"
  ,"scripts/client/user.js"
], function($) {

  $(function() {
  
    window.updateOrientation = function() {
      switch(window.orientation){
        //portrait
        case 0:
        case 180:
          break;
        //landscape
        case -90:
        case 90:
          break;
      }
    };
    
    Socket.on('connect', function() {
      console.log('socket connected');

      Chat.update_from_server();
    });
    Socket.on('disconnect', function() {
      console.log('socket disconnected');
    });
    Socket.on('reconnect_failed', function() {
      console.log('reconnect failed');
    });
    Socket.on('reconnecting', function(delay, attempts){
      console.log('reconnecting '+delay+' '+attempts);
    });

  });
});
