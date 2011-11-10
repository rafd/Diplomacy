/*test('assertions', function() {
  equals( 1, 1, 'one equals one');
});

test('chat', function(){
  msg = ""+Math.floor(Math.random()*1000);

  stop();
  Syn.click( {},'chat-input' ).type(msg).click({},'submit', function(){
       equals(msg, $('#messages div:last-child .content').html(), 'submitted message is displayed');
       start();
    });
  
});*/
setTimeout(function(){


pavlov.specify("crud", function(){
  
  var gen_id = function() {
    return '00000000000000000000' + Math.floor(Math.random() * 10000)
  }

  var gen_user_spec = function(){
    return { 
      name: Math.floor(Math.random() * 1000),
      _id: gen_id()
    }
  }

  var gen_game_spec = function(){
    return {
      name: Math.floor(Math.random() * 1000)
    }
  }

  describe("user", function(){ 
    describe("create and read", function(){
      var user_spec = gen_user_spec();

      var user = new User(user_spec);
      stop();
      user.save(null, {success: function(){ start(); }}); 

      it("in memory", function(){
        assert(user.get('name')).equals(user_spec.name, "user name matches");
      });

      var temp_user = new User({_id: user_spec._id});

      stop();
      temp_user.fetch({success: function(data){ start(); }});
      
      it("in the server", function(){
        assert(temp_user.get('name')).equals(user_spec.name, "user name matches");
      });

      //it("in localstorage");

    });
    describe("update", function(){
      var user_spec = gen_user_spec();

      var user = new User(user_spec);
      stop();
      user.save(null, {success:function(){
        start();
        }});

      var name_change = 'Cathy';

      user.set({name: name_change});
      stop();
      user.save(null, {success: function(){ start(); }});
      
      it("in memory", function(){
        assert(user.get('name')).equals(name_change, "user name changed");
      });

      var temp_user = new User({_id: user_spec._id});
      stop();
      temp_user.fetch({success: function(){ start(); }});

      it("on the server", function(){
        assert(temp_user.get('name')).equals(name_change, "user name changed");
      });

      //it("in localstorage");

    });
    describe("destroy", function(){
      var user_spec = gen_user_spec();

      var user = new User(user_spec);
      stop();
      user.save(null, {success:function(){ start(); }});
      
      stop();
      user.destroy({success:function(){ start(); }});

      //it("in memory");

      it("on server", function(){
        var temp_user = new User({_id: user_spec._id});

        stop();
        temp_user.fetch({success: function(model,resp){ 
          assert(JSON.stringify(resp)).equals("{}", "user deleted");
          start(); 
          }});
      });

      //it("in localstorage");

    });
  });

  describe("game", function(){ 
    describe("create + read", function(){
      // create user
      var user_spec = gen_user_spec();
      var user = new User(user_spec);
      stop();
      user.save(null, {success:function(){ start(); }});

      // create game
      var spec = gen_game_spec();
      var game = user.get('games').create(spec);
      stop();
      game.save(null, {success:function(){ start(); }});

      it("in memory", function(){
        assert(game.get('name')).equals(spec.name, "game name matches");
        assert(game.get('chatrooms').length).equals(2, "chatroom count correct");
        assert(game.get('chatrooms').at(0).get('messages').length).equals(1, "message count correct");
      });


      var temp = new Game({_id: game.id});

      stop();
      temp.fetch({success: function(data){ start(); }});

      it("in server", function(){
        assert(temp.get('name')).equals(spec.name, "game name matches");
        assert(temp.get('chatrooms').length).equals(2, "chatroom count correct");
        assert(temp.get('chatrooms').at(0).get('messages').length).equals(1, "message count correct");
      });

      //it("in localstorage");

    });
    describe("fetch all", function(){
      
      it("in memory");
      it("in server");

      //it("in localstorage");

    });
    describe("update", function(){
      
      it("in memory");
      it("in server");

      //it("in localstorage");

    });
    describe("destroy", function(){

      it("in memory");
      it("in server");

      //it("in localstorage");

    });
  });

  describe("chatroom", function(){ 
    describe("create + read", function(){
      before(function(){
      });

      it("in memory");
      it("in localstorage");
      it("in server");
      it("on another client immediately");

    });
    describe("readAll", function(){
      
      it("in memory");
      it("in localstorage");
      it("in server");
      it("on another client immediately");

    });
    describe("update", function(){
      
      it("in memory");
      it("in localstorage");
      it("in server");
      it("on another client immediately");

    });
    describe("destroy", function(){

      it("in memory");
      it("in localstorage");
      it("in server");
      it("on another client immediately");

    });
  });

  describe("message", function(){ 
    describe("create + read", function(){
      before(function(){
      });

      it("in memory");
      it("in localstorage");
      it("in server");
      it("on another client immediately");

    });
    describe("readAll", function(){
      
      it("in memory");
      it("in localstorage");
      it("in server");
      it("on another client immediately");

    });
    describe("update", function(){
      
      it("in memory");
      it("in localstorage");
      it("in server");
      it("on another client immediately");

    });
    describe("destroy", function(){

      it("in memory");
      it("in localstorage");
      it("in server");
      it("on another client immediately");

    });
  });

});

},1000);


