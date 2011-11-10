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
  
  var user_id;

  var gen_spec = function(){
    return { 
      name: Math.floor(Math.random() * 1000),
      _id: '00000000000000000000' + Math.floor(Math.random() * 10000)
    }
  }

  describe("user", function(){ 
    describe("create and read", function(){
      var user_spec = gen_spec();

      var user = new User(user_spec);
      stop();
      user.save(null, {success: function(){ start(); }}); 

      it("in memory", function(){
        assert(user.get('name')).equals(user_spec.name);
      });

      var temp_user = new User({_id: user_spec._id});

      stop();
      temp_user.fetch({success: function(data){ start(); }});
      
      it("in the server", function(){
        assert(temp_user.get('name')).equals(user_spec.name);
      });

      //it("in localstorage");
      //it("on another client immediately");

    });
    describe("update", function(){
      var user_spec = gen_spec();

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
        assert(user.get('name')).equals(name_change);
      });

      var temp_user = new User({_id: user_spec._id});
      stop();
      temp_user.fetch({success: function(){ start(); }});

      it("on the server", function(){
        assert(temp_user.get('name')).equals(name_change);
      });

      //it("in localstorage");
      //it("on another client immediately");

    });
    describe("destroy", function(){
      var user_spec = gen_spec();

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
          assert(JSON.stringify(resp)).equals("{}");
          start(); 
          }});
      });

      //it("in localstorage");
      //it("on another client immediately");

    });
  });


  describe("game", function(){ 
    describe("create + read", function(){
      before(function(){
      });

      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("readAll", function(){
      
      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("update", function(){
      
      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("destroy", function(){

      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
  });

  describe("chatroom", function(){ 
    describe("create + read", function(){
      before(function(){
      });

      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("readAll", function(){
      
      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("update", function(){
      
      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("destroy", function(){

      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
  });

  describe("message", function(){ 
    describe("create + read", function(){
      before(function(){
      });

      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("readAll", function(){
      
      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("update", function(){
      
      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
    describe("destroy", function(){

      it("should store in memory");
      it("should store in localstorage");
      it("should store in server");
      it("should appear on another client immediately");

    });
  });

});

},1000);


