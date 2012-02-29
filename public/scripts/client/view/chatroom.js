define(['scripts/client/bootstrap.js'], function(){


  ChatRoomsView = Backbone.View.extend({
    className: "chatrooms",
    initialize: function(chatrooms){
      this.chatrooms = chatrooms;

      $('#side').append(this.el);

      this.addAll();
    },
    addAll: function() {
      _.each(this.chatrooms, function(chatroom){this.addOne(chatroom)}, this);
    },
    addOne: function(chatroom){
      //TODO: should be passing target to attach to
      new ChatRoomView(chatroom, this.el);
    }
  });

  ChatRoomView = Backbone.View.extend({
    className: "chatroom",
    events: {
      "click .submit": "send"
    },
    template: T['chatroom'],
    initialize: function(chatroom, target){
      this.model = chatroom;
      this.messages = this.model.get('messages');

      player = chatroom.get('players').reject(function(p){ p == current_player})[0];

      $(this.el).html(this.template.r({
        power: player.get('power'),
        user: player.get('user').toData(),
        online: false
      }));

      $(this.el).hide();

      $(target).append(this.el);

      this.input = $(this.el).find("form input[type=text]");
      this.output = $(this.el).find(".messages");

      this.messages.bind('reset', this.addAll, this);
      this.messages.bind('add', this.addOne, this);

      this.addAll();
    },
    addOne: function(m) {
      var view = new MessageView({model: m});
      this.output.append(view.render().el);
    },
    addAll: function() {
      this.output.html('');
      this.messages.each(this.addOne, this);
    },
    send: function() {
      var content = this.input.val();
      
      m = this.messages.create({content:content,username:user.get('name')});

      this.input.val('');
    }
  });

  MessageView = Backbone.View.extend({
    template: T['message'],
    initialize: function() {
      this.bind('change', function(){this.render()}, this);
    },
    render: function(){
      $(this.el).html(this.template.r(this.model.toData()));
      
      return this;
    }
  });

});