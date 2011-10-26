require({paths: {"socket.io":"/socket.io/socket.io"}},
[
  "jquery"
  ,"scripts/client/chat.js"
  ,"scripts/client/event_log.js"
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

    window.user_id = Math.floor(Math.random()*1001);
    
    Socket.on('connect', function() {
      console.log('socket connected');

      Chat.update_from_server();

      Socket.emit('user:authenticate', user_id);
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
