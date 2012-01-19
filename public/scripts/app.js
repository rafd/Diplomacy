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
  ,"scripts/client/model/game_init.js"
  ,"scripts/client/model/player.js"
  ,"scripts/client/model/game.js"
  ,"scripts/client/model/unit.js"
  ,"scripts/client/model/user.js"
  ,"scripts/client/view/lobby.js"
  ,"scripts/client/view/board.js"
  ,"scripts/client/chat.js"
  ,"scripts/client/initialize.js"
  
], function($) {

  $(function() {

    
    initialize();


    

    


    window.DataDump = function(){
      console.log(user.toJSON());

      _.each(Games, function(game){
        console.log(game.toJSON());
      });

    };

    /*
    
    Socket.on('connect', function() {
      console.log('socket connected');

      //Chat.update_from_server();
      GamesList.update_from_server();
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
    
 
    //user.join_chat();

    socket_defaults = {
      'reconnect':true,
      'reconnection delay': 1000,
      'max reconnection attempts':10
    };

  
    window.socket = io.connect('/', socket_defaults);

/*
    if(typeof localStorage.user_id == "undefined"){
      window.user = new User();
      user.save();
      localStorage.user_id = user.id;
    } else {
      window.user = new User({_id: localStorage.user_id});
      user.fetch({success:function(err, data){
        if(data == null){
          user.save();
        }
      }});
    }
    */

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
    
    /*
    user.get('games').fetch({
      success : function(){
        if(user.get('games').length == 0) {
          user.get('games').create();
        }
        current_game = user.get('games').first();

        //TODO: should be capturing an event
        setTimeout(function(){
          public_chatroom = new ChatRoomView(current_game.get('chatrooms').at(0));
          private_chatroom = new ChatRoomView(current_game.get('chatrooms').at(1));
        }, 100);

        //current_game.get('chatrooms').at(0).get('messages')
        //current_game.get('players').add(window.user);
        //public_chatroom = new ChatRoomView(current_game.get('chatrooms').at(0));
        //current_game.get('chatrooms').at(0).get('messages').create({content:"commonpoo",username:"123"});

        //
        //current_game.get('chatrooms').at(1).get('messages').create({content:"privatepee",username:"345"});

      }
    });
    */
    
  });
});
