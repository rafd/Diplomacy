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
pavlov.specify("crud", function(){
  
  /*before(function(){
    
  });*/

  describe("game", function(){ 
    describe("create + read", function(){
      
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



