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
    className: 'order_submit',
    template: T['order_submit'],
    initialize: function(units){
      $(this.el).html(this.template.r({units:units.toJSON()}));

      $('#side').append(this.el);
    },
    events: {
      "click .submit" : "parseOrders"
    },
    parseOrders: function(e){
      e.preventDefault();
      var data = $(this.el).find("form").serializeArray();
      var orders=[];
      for(var x=0;x<data.length/4;x+=1)
      {
        orders[x]={};
        orders[x].prov=data[x*4].value;
        orders[x].move=data[x*4+1].value;
        orders[x].from=data[x*4+2].value;
        orders[x].to=data[x*4+3].value;
      }
    }
  })



});