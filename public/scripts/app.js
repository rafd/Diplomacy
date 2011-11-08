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
  ,"scripts/client/game.js"
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

    /*
    
    Socket.on('connect', function() {
      console.log('socket connected');

      //Chat.update_from_server();
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
*/
    // temp stuff

    window.user = CurrentUser.first() || CurrentUser.create();
 
    //user.join_chat();

    Socket.on('chat:users',function(data){
      $('#users').html('');
      _.each(data, function(x){$('#users').append("<div>"+x.name+"</div>")});
    });

    $('#users div').live('click', function(){
      $('#private-messages').text($(this).html());
      console.log(user.get("name") + ' ' + $(this).html())
    });

    

    games = new Games();
    games.create();

    current_game = games.first();
    current_game.players.add(window.user);

    public_chatroom = new ChatRoomView(current_game.public_chat);
    current_game.public_chat.messages.create({content:"commonpoo",username:"123"});

    private_chatroom = new ChatRoomView(current_game.private_chat);
    current_game.private_chat.messages.create({content:"privatepee",username:"345"});

  });
});
