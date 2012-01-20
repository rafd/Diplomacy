define(['scripts/client/bootstrap.js'], function(){

  window.Message = Backbone.RelationalModel.extend({
    urlRoot: "message",
    nested: true,
    initialize: function(spec){
      this.set({
        htmlId: 'message_' + this.cid,
        created_at: this.get('created_at') || new Date().getTime()
      });
    }
  });

  window.Messages = Backbone.Collection.extend({
    url: 'messages',
    model: Message
  });

  window.MessageView = Backbone.View.extend({
    tagName: 'div',
    template: T['message'],
    render: function(){
      $(this.el).html(this.template.r(this.model.toJSON()));
      return this;
    }
  });

  // Chat Room

  window.ChatRoom = Backbone.RelationalModel.extend({
    urlRoot: "chatroom",
    relations: [
      {
        type: 'HasMany',
        key: 'messages',
        relatedModel: 'Message',
        collectionType: 'Messages',
        reverseRelation: {
          key: 'chatroom',
          includeInJSON: false
        }
      }
    ],
    initialize: function(spec){
      this.get('messages').url = "chatrooms/"+this.id+'/messages';
      if(spec.messages){
        _.each(spec.messages, function(msg) {
          this.get('messages').create(msg);
        }, this);
      } else {
        this.get('messages').create({content:"Welcome",username:"000"});
      }
      
      //this.get('messages').url = this.urlRoot + '/' + this.id + '/';
    }
  });

  window.ChatRooms = Backbone.Collection.extend({
    model: ChatRoom,
    url: 'chatroom'
  });

  window.ChatRoomView = Backbone.View.extend({
    className: 'chatroom',
    events: {
      "click .submit": "send"
    },
    template: T['chatroom'],
    initialize: function(chatroom){
      this.messages = chatroom.get('messages');

      $(this.el).html(this.template.r({}));
      $('#side').append(this.el);

      this.input = $(this.el).find("form input[type=text]");
      this.output = $(this.el).find(".messages");

      this.messages.bind('reset', this.addAll, this);
      this.messages.bind('add', this.addOne, this);

      this.addAll();

      //this.messages.reset();
      
      //this.messages.fetch();
      /*console.log('fetching messages from LocalStorage');
      
      Messages.fetch({
        success: function(){
          console.log('received messages from LocalStorage');
        }
      });*/
      
      // receive messages
      /*Socket.on('chat:message', function(data) {
        Messages.create(data);
      });*/
    },
    addOne: function(m) {
      var view = new MessageView({model: m});
      this.output.append(view.render().el);
    },
    addAll: function() {
      this.output.html('');
      this.messages.each(this.addOne, this);
    },
    send: function(e){
      e.preventDefault();

      var content = this.input.val();
      
      m = this.messages.create({content:content,username:user.get('name')});

      /*Socket.emit('chat:message', m.toJSON());*/

      this.input.val('');
    },
    update_from_server: function(){
      console.log('fetching messages from server');
      //TODO: check if there are new messages to grab (by last timestamp)
      //      instead of getting all and *then* checking
      /*
      Socket.emit('chat:getAll', function(data) {
        
        console.log('received messages from server');
        
        if(data.length == 0 || Messages.length == 0 || (_.last(data).created_at != Messages.last().get('created_at'))){
          console.log('replacing messages with those from server')
          //should be able to just do the following, but it isn't being persisted in LocalStorage
          //Messages.reset(data);

          l = this.chatroom.messages.models.length
          for(i=0;i<l;i++){
            this.chatroom.messages.models[0].destroy();
          }
          this.chatroom.messages.reset();
        
          _.each(data, function(d){Messages.create(d)});
        } else {
          console.log('nothing to update');
        }
      }); */
    }
  });

});