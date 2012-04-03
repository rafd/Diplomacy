define(['scripts/client/bootstrap.js'], function(){
  
  window.BoardView = Backbone.View.extend({
    template: T['board'],
    className: 'board',
    id: this._id,
    events: {
      "click a": "goToLobby"
    },
    initialize: function(model){
      this.model = model;


      this.render();
    },
    render: function(){
      console.log('rendering board...');
      console.log(this.model.get('players').toData())
      $(this.el).html(this.template.r(this.model.toJSON()));

      if($("#diplomacy .board").length == 0){
        $('#diplomacy').append(this.el);
      } else {
        $('#diplomacy .board').replaceWith(this.el);
      }

      current_player = this.model.get('players').ownedBy(window.user);
      
      new ChatRoomList(this.model.get('chatrooms').ownedBy(current_player));
      new ChatRoomsView(this.model.get('chatrooms').ownedBy(current_player));
      new UnitList(this.model.get('units'));
      new MapView($(this.el), this.model.get('units')); //passed board(html) and units(bb model reference)
      new OrderSubmit(this.model, current_player);

      $(this.el).show()

      return this;
    },
    goToLobby: function(e){
      e.preventDefault();
      $(this.el).remove();
      $(".lobby").show();
    }
  });

  MapView = Backbone.View.extend({
    className: "units",
    initialize: function(target, units){
      this.units = units;
      this.target = target;

      this.units.bind("reset", this.addAllUnits, this);

      $("#map").append(this.el); //TODO: should attach to target, not #map

      this.addAllUnits();
    },
    addUnit: function(unit){
      new MapUnit($(this.el), unit);
    },
    addAllUnits: function(){
      $(this.el).html("");
      _.each(this.units.toData(), function(unit){this.addUnit(unit)}, this);
    }
  });


  MapUnit = Backbone.View.extend({
    template: T['map_unit'],
    events: {
      "click":"clicked"
    },
    initialize: function(target, unit){//unit: {owner: "Ger",province:"Ber",utype:"a"}
      this.unit = unit;
      var loc = window.MAP_COORDS[unit.province]
      var top, left, color, sprite;
      if(loc!=undefined){
        top = loc[1] + "px";
        left = loc[0] + "px";
        if(unit.utype == 'f')
          sprite = window.FLEET_SPRITE[unit.owner];
        else
          sprite = window.ARMY_SPRITE[unit.owner];
      }

      $(this.el).html(this.template.r({top:top,left:left,sprite:sprite,utype:unit.utype}));

      $(target).append(this.el);
    },
    clicked: function(){
      alert(this.unit.province +' wuz clicked');
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
    events: {
      "click li": "selectChatRoom"
    },
    initialize: function(chatrooms){

      _chatrooms = _.map(chatrooms, function(cr){
        if(cr.get('players').length == 2){
          player = cr.get('players').reject(function(p){ p == current_player})[0]
        
          return {
            id: cr.id,
            power: player.get('power'),
            user: player.get('user').toData(),
            online: false
           }
        }
        else {
          return {
            id: cr.id,
            power: "Global",
            user: {name: "All"},
            online: true
          }
        }
      });

      $(this.el).html(this.template.r({chatrooms:_chatrooms}));

      $('#side').append(this.el);
    },
    selectChatRoom: function(e){
      // hide all chatrooms
      $("#side .chatrooms .chatroom").hide();

      // show the selected
      $("#side .chatrooms .chatroom#"+$(e.target).attr("data-id")).show();

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
      //this.player.get('orders').add(orders);
      this.player.set({orders:orders});
      this.player.save();
      //socket.emit('game:submit',this.game.id,this.player.id,orders, _.bind(function(err,data){ 
        //$(e.target).parent().replaceWith(T['order_submit_unit'].r({units:data}));
      //},this));
    },
    resolveMoves: function(e)
    {
      e.preventDefault();
      socket.emit('game:resolve',this.game.id, _.bind(function(err,data){
        console.log(data)
        //update board with returned state
        this.game.set({units:data});//owner, utype, prov, move
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