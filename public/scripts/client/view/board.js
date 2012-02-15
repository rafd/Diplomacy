define(['scripts/client/bootstrap.js'], function(){
  
  window.BoardView = Backbone.View.extend({
    template: T['board'],
    className: 'board',
    id: this._id,
    events: {
      "click a": "goToLobby"
    },
    initialize: function(){
      this.render();
    },
    render: function(){
      console.log('rendering board...');
      
      $(this.el).html(this.template.r(this.model.toJSON()));

      if($("#diplomacy .board").length == 0){
        $('#diplomacy').append(this.el);
      } else {
        $('#diplomacy .board').replaceWith(this.el);
      }



      current_player = this.model.get('players').ownedBy(window.user);
      
      chatroomlist = new ChatRoomList(this.model.get('chatrooms').ownedBy(current_player));
      chatroomview = new ChatRoomView(this.model.get('chatrooms').at(0));
      playerlist = new PlayerList(this.model.get('players'));
      unitlist = new UnitList(this.model.get('units'));

      // TODO: units.ownedBy should take (player) not ("power")
      ordersubmit = new OrderSubmit(this.model.get('units').ownedBy(current_player.get('power')));

      return this;
    },
    goToLobby: function(e){
      e.preventDefault();
      $(this.el).hide();
      $(".lobby").show();
    }
  });


  PlayerList = Backbone.View.extend({
    template: T['players'],
    initialize: function(players){
      $(this.el).html(this.template.r({
        players: players.toData()
      }));

      $('#side').append(this.el);
    }

  });

  UnitList = Backbone.View.extend({
    template: T['map'],
    initialize: function(units){


      $(this.el).html(this.template.r({units:units.toJSON()}));

      $('#map').append(this.el);
    }
  });

  OrderSubmit = Backbone.View.extend({
    template: T['order_submit'],
    initialize: function(units){
      //TODO: we should find a way to do this without creating a new unitcollection
      units = new UnitCollection(units);


      $(this.el).html(this.template.r({units:units.toData()}));

      $('#side').append(this.el);
    }
  });

  ChatRoomList = Backbone.View.extend({
    template: T['chatrooms'],
    initialize: function(chatrooms){
      chatrooms = new ChatRoomCollection(chatrooms);

      $(this.el).html(this.template.r({chatrooms:chatrooms.toData()}));
      console.log(chatrooms.toData())

      $('#side').append(this.el);
    }
  });



});