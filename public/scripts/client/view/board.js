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
      this.units=units;
      $('#side').append(this.el);
    },
    events: {
      "click .submit" : "parseOrders",
      "click .move option" : "clickedMove",
      "click .from option" : "clickedMove"
    },
    parseOrders: function(e){
      e.preventDefault();
      var data = $(this.el).find("form").serializeArray();
      var orders=[];
      var sum=0;
      for(var x=0;x<data.length/4;x+=1)
      {
        orders[x]={};
        orders[x].prov=data[sum].value;
        orders[x].move=data[sum+1].value;
        if(orders[x].move=="s")
        {
          orders[x].from=data[sum+2].value;
          orders[x].to=data[sum+3].value;
          sum+=4;
        }
        else if(orders[x].move=="m")
        {
          orders[x].from=orders[x].prov;
          orders[x].to=data[sum+2].value;
          sum+=3;
        }
        else if(orders[x].move=="h")
        {
          orders[x].from=orders[x].prov;
          orders[x].to=orders[x].prov;
          sum+=2;
        }
      }
    },
    clickedMove: function(e){
      prov = $(e.target).parent().parent().find("[name='prov']").val();
      var u= _.select(this.units.toJSON(), function(unit) { return unit.province == prov});
      //var m=_.clone(window.MAP[prov]);
      switch($(e.currentTarget).val())
      {
        case "h":
          u.move_h = true;
          u.from = u.province;
          u.to = u.province;
          break;

        case "m":
          u.move_m = true;
          u["to?"] = true
          u.to = possible_moves(u[0]);
          break;

        case "s":
          u.move_s = true;
          u["from?"] = true;
          u["to?"] = true;
          var m=possible_moves(u[0]);
          u.from = _.without(possible_support(m),prov);
          u.to=m;
          break;
        
        default:
          
      }
      $(e.target).parent().parent().replaceWith(T['order_submit_unit'].r({units:u}));
      
    },
  })

  function possible_support(to)
  {
    var ret=[];
    for(var x in to)
    {
      var a = window.MAP[to[x]].army_moves;
      var f = window.MAP[to[x]].fleet_moves;
      ret = _.union(ret,a,f);
    }
    return ret;
  }


  function possible_moves(unit)
  {
    if (unit.utype=="a" || unit.utype=="A")
      return window.MAP[unit.province].army_moves;
    else if(unit.utype=="f" || unit.utype=="F")
      return window.MAP[unit.province].fleet_moves;
  }

});