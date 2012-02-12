define(['scripts/client/bootstrap.js'], function(){

  window.ChatRoomView = Backbone.View.extend({
    events: {
      "click .submit": "send"
    },
    template: T['chatroom'],
    initialize: function(chatroom){
      this.model = chatroom;
      this.messages = this.model.get('messages');

      $(this.el).html(this.template.r({}));
      $('#side').append(this.el);

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
      console.log("MESSSAGE")
      console.log(this.model.toData())
      $(this.el).html(this.template.r(this.model.toData()));

      
      return this;
    }
  });

});