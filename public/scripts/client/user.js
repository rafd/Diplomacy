define(['scripts/client/bootstrap.js'], function(){

  User = Backbone.Model.extend({
    initialize: function(spec){
      this.set({
        name: this.get('name') || Math.floor(Math.random()*1001)
      });
    },
    join_chat: function(){
      Socket.emit('chat:connect', this.toJSON());
    }
  });
  
  window.CurrentUser = new (Backbone.Collection.extend({
    model: User,
    localStorage: new Store("user"),
    initialize: function() {
      this.fetch();
    }
  }))();


  window.user = CurrentUser.first() || CurrentUser.create();
 
  user.join_chat();

  Socket.on('chat:users',function(data){
    $('#users').html('');
    _.each(data, function(x){$('#users').append("<div>"+x.name+"</div>")});
  });

});