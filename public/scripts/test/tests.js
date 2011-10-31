test('assertions', function() {
  equals( 1, 1, 'one equals one');
});

test('chat', function(){
  msg = ""+Math.floor(Math.random()*1000);

  stop();
  Syn.click( {},'chat-input' ).type(msg).click({},'submit', function(){
       equals(msg, $('#messages div:last-child .content').html(), 'submitted message is displayed');
       start();
    });
  
});