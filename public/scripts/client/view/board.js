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



      this.current_player = this.model.get('players').ownedBy(window.user);
      
      chatroomlist = new ChatRoomList(this.model.get('chatrooms').ownedBy(this.current_player));
      
      //new ChatRoomsView(this.model.get('chatrooms').ownedBy(current_player));

      playerlist = new PlayerList(this.model.get('players'));
      unitlist = new UnitList(this.model.get('units'));

      // TODO: units.ownedBy should take (player) not ("power")
      ordersubmit = new OrderSubmit(this.model, this.current_player);

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
      this.units = units;
      
      this.units.bind("reset", function(){this.render()}, this);

      $('#map').append(this.el);

      this.render();
    },
    render: function(){
      $(this.el).html(this.template.r({units:this.units.toData()}));
    }
  });

  ChatRoomList = Backbone.View.extend({
    template: T['chatrooms'],
    initialize: function(chatrooms){
      chatrooms = new ChatRoomCollection(chatrooms);

      $(this.el).html(this.template.r({chatrooms:chatrooms.toData()}));

      $('#side').append(this.el);
    }
  });

  OrderSubmit = Backbone.View.extend({
    className: 'order_submit',
    template: T['order_submit'],
    initialize: function(game, player){
      this.game = game;
      this.player = player;

      this.render();
      
      $('#side').append(this.el);
    },
    render: function(){
      this.units = new UnitCollection(this.game.get('units').ownedBy(this.player.get('power')));
      $(this.el).html(this.template.r({units:this.units.toData()}));
    },
    events: {
      "click .submit" : "parseOrders",
      "click .resolve" : "resolveMoves",
      "change select.move" : "clickedMove",
      "change select.from" : "clickedMove"
    },
    parseOrders: function(e){
      e.preventDefault();
      var data = $(this.el).find("form").serializeArray();
      var orders=[];
      for(var x=0,sum=0; sum!=data.length; x+=1,sum+=4)
      {
        orders[x]={ order: {} };
        orders[x].owner=data[sum].value;
        orders[x].utype=data[sum+1].value;
        orders[x].province=data[sum+2].value;
        orders[x].order.move=data[sum+3].value;
        if(orders[x].order.move=="s")
        {
          orders[x].order.from=data[sum+4].value;
          orders[x].order.to=data[sum+5].value;
          sum+=2;
        }
        else if(orders[x].order.move=="m")
        {
          orders[x].order.from=orders[x].province;
          orders[x].order.to=data[sum+4].value;
          sum+=1;
        }
        else if(orders[x].order.move=="h")
        {
          orders[x].order.from=orders[x].province;
          orders[x].order.to=orders[x].province;
        }
      }
      this.player.orders=orders;

      socket.emit('game:submit',this.game.id,this.player.id,orders, _.bind(function(err,data){ 
        //$(e.target).parent().replaceWith(T['order_submit_unit'].r({units:data}));
      },this));
    },
    resolveMoves: function(e)
    {
      e.preventDefault();
      socket.emit('game:resolve',this.game.id, _.bind(function(err,data){
        //update board with returned state
        this.game.set({units:data});
        this.render();
        $(e.target).parent().replaceWith(T['order_submit_unit'].r({units:data}));
      },this));
    },
    clickedMove: function(e){
      prov = $(e.target).parent().find("[name='prov']").val();
      var u= _.select(this.units.toData(), function(unit) { return unit.province == prov});
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
          var twoaway = _.without(possible_support(m),prov);

          //TODO for more filtering
          u.from=twoaway; //u.from = twoaway intersect unitlist
          u.to=m; //u.to = m intersect possible_moves(twoaway.selectedvalue)
          break;
        
        default:
          console.log("move is not understood in clickedMove");
          
      }
      $(e.target).parent().replaceWith(T['order_submit_unit'].r({units:u}));
      
    }
  });

  function possible_support(to)
  {
    var ret=[];
    for(var x in to)
      ret = _.union(ret,window.MAP[to[x]].army_moves,window.MAP[to[x]].fleet_moves);
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