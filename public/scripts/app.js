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

  ,"scripts/client/helper/game_init.js"
  ,"scripts/client/helper/map_coord.js"

  ,"scripts/client/model/chatroom.js"
  ,"scripts/client/model/game.js"
  ,"scripts/client/model/message.js"
  ,"scripts/client/model/order.js"
  ,"scripts/client/model/player.js"
  ,"scripts/client/model/turn.js"
  ,"scripts/client/model/unit.js"
  ,"scripts/client/model/user.js"

  ,"scripts/client/view/board.js"
  ,"scripts/client/view/chatroom.js"
  ,"scripts/client/view/lobby.js"
  ,"scripts/client/view/pregame.js"
  ,"scripts/client/view/splash.js"
  
  ,"scripts/client/initialize.js"
], function($) {

  $(function() {

    
    initialize();


    

    


    window.DataDump = function(){
      console.log(user.toJSON());

      console.log(Games.toJSON());

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
