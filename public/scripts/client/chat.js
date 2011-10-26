define(['scripts/client/bootstrap.js'], function(){

  window.Message = Backbone.Model.extend({
    initialize: function(spec){
      this.set({
        htmlId: 'message_' + this.cid,
        created_at: this.get('created_at') || new Date().getTime()
      });
    }
  });

  window.MessageView = Backbone.View.extend({
    tagName: 'div',
    template: _.template("<span class='username'><%= username %>: </span><span class='content'><%- content %></span>"),
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


  window.ChatView = Backbone.View.extend({
    el: $("#chat"),
    events: {
      "click #submit": "send"
    },
    initialize: function(){
      this.input = $("form #chat-input");
      Messages.bind('reset', this.addAll, this);
      Messages.bind('add', this.addOne, this);
      
      console.log('fetching messages from LocalStorage');
      Messages.fetch({
        success: function(){
          console.log('received messages from LocalStorage');
        }
      });
      
      // receive messages
      Socket.on('chat:message', function(data) {
        Messages.create(data);
      });
    },
    addOne: function(m) {
      var view = new MessageView({model: m});
      $("#messages").append(view.render().el);
    },
    addAll: function() {
      $("#messages").html('');
      Messages.each(this.addOne);
    },
    send: function(){
      var content = this.input.val();
      
      m = Messages.create({content:content,username:user.get('name')});

      Socket.emit('chat:message', m.toJSON());

      this.input.val('');
      return false;
    },
    update_from_server: function(){
      console.log('fetching messages from server');
      //TODO: check if there are new messages to grab (by last timestamp)
      //      instead of getting all and *then* checking
      Socket.emit('chat:getAll', function(data) {
        
        console.log('received messages from server');
        
        if(data.length == 0 || Messages.length == 0 || (_.last(data).created_at != Messages.last().get('created_at'))){
          console.log('replacing messages with those from server')
          //should be able to just do the following, but it isn't being persisted in LocalStorage
          //Messages.reset(data);

          l = Messages.models.length
          for(i=0;i<l;i++){
            Messages.models[0].destroy();
          }
          Messages.reset();
        
          _.each(data, function(d){Messages.create(d)});
        } else {
          console.log('nothing to update');
        }
      });
    }
  });

  window.Chat = new ChatView();

});