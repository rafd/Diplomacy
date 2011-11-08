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
  //,"scripts/client/event_log.js"
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

    //window.user = CurrentUser.first() || CurrentUser.create();
    window.user = new User();
    user.save();
 
    //user.join_chat();

    window.Socket = {};

    socket_defaults = {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    };

    Socket.users = io.connect('/users', socket_defaults);

    Socket.users.on('connect', function(){
      Socket.users.emit('ping', null, function(error, res) {
        console.log(res);
      });
    });

    /*
    Socket.on('chat:users',function(data){
      $('#users').html('');
      _.each(data, function(x){$('#users').append("<div>"+x.name+"</div>")});
    });

    $('#users div').live('click', function(){
      $('#private-messages').text($(this).html());
      console.log(user.get("name") + ' ' + $(this).html())
    });
    */
    
    //user.get('games').create();

    games = new Games();
    games.create();
    current_game = games.first();
    
    current_game.get('players').add(window.user);

    
    public_chatroom = new ChatRoomView(current_game.get('chatrooms').at(0));
    current_game.get('chatrooms').at(0).get('messages').create({content:"commonpoo",username:"123"});

    private_chatroom = new ChatRoomView(current_game.get('chatrooms').at(1));
    current_game.get('chatrooms').at(1).get('messages').create({content:"privatepee",username:"345"});
    

  });
});
