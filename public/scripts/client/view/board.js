define(['scripts/client/bootstrap.js'], function(){
  
  window.BoardView = Backbone.View.extend({
    template: T['board'],
    className: 'board',
    id: this.id,
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
      
      chatroomview = new ChatRoomView(this.model.get('chatrooms').at(0));
      playerlist = new PlayerList(this.model.get('players'));
      unitlist = new UnitList(this.model.get('units'));
      ordersubmit = new OrderSubmit(this.model.get('units'));

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
      $(this.el).html(this.template.r({players:players.toJSON()}));

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
      $(this.el).html(this.template.r({units:units.toJSON()}));

      $('#side').append(this.el);
    }
  })



});