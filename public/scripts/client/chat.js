define(['scripts/client/bootstrap.js'], function(){

  window.Message = Backbone.Model.extend({
    initialize: function(spec){
      this.set({
        htmlId: 'message_' + this.cid
      });
    }
  });

  window.MessageView = Backbone.View.extend({
    tagName: 'div',
    template: _.template("<span class='username'><%= username %>: </span><span class='content'><%= content %></span>"),
    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  // COLLECTION

  window.Messages = new (Backbone.Collection.extend({
    model: Message,
    localStorage: new Store("messages")
  }))();

  /*
    input text box
    list of messages (5 most recent)
    'more' link that shows 5 more
  */
  window.ChatView = Backbone.View.extend({
    el: $("#chat"),
    events: {
      "click #submit": "send",
      "click #more": "more"
    },
    initialize: function(){
      this.input = $("form #chat-input");
      Messages.bind('reset', this.addAll, this);
      Messages.bind('add', this.addOne, this);
      
      
      Messages.fetch();

      Socket.on('chat receive message', function (data) {
        Messages.create({content:data.content,username:'Canna'})
      });
    },
    addOne: function(m) {
      var view = new MessageView({model: m});
      $("#messages").append(view.render().el);
    },
    addAll: function() {
      Messages.each(this.addOne);
    },
    send: function(){
      var content = this.input.val();
      Socket.emit('chat create message', { content: content, username:'Raf'});
      Messages.create({content:content,username:'Raf'});
      this.input.val('');
      return false;
    },
    more: function(){
      alert('moo');
      return false;
    }
  });

  window.Chat = new ChatView();

});