define(['scripts/client/bootstrap.js'], function(){

  var random_from = function(arr){
    return arr[Math.floor(Math.random() * arr.length)]
  } 

  window.Unit = Backbone.Model.extend({
    initialize: function(spec){
    }
  });

  window.UnitCollection = Backbone.Collection.extend({
    model: Unit
  });

  window.Units = new UnitCollection();

  /*

  window.UnitView = Backbone.View.extend({
    tagName: 'div',
    template: _.template("<%= owner %>: <%= province %> (<%= utype %>)"),
    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  // create a bunch of units
  //for(var i=0;i<10;i++){
  //  Units.create();
  //}

  window.UnitsView = Backbone.View.extend({
   initialize: function(){
      Units.bind('reset', this.addAll, this);
      Units.bind('add', this.addOne, this);

      Units.fetch();
    },
    addOne: function(m) {
      var view = new UnitView({model: m});
      $("#map").append(view.render().el);
    },
    addAll: function() {
      $("#map").html('');
      Units.each(this.addOne);
    },
  });

  window.UnitList = new UnitsView();



  window.OrdersView = Backbone.View.extend({
    initialize: function(){
      player = {};
      player.country = random_from(PLAYERS);
      player.units = _.filter(Units.models,function(unit){return unit.get("owner") == player.country});

      $("#orders").html(this.template(player));
    
    },
    tagName: 'div',
    template: _.template("<div>You are: <%= country %></div>Your units:<% _.each(units, function(unit){%><div><%= unit.get('province') %><select><option>hold</option><option>move</option><option>support</option></select>to: <select><% _.each(PROVINCES, function(province){ %><option><%= province %></option><% }); %></select></div><%}); %>")

  });

  window.OrdersInput = new OrdersView();
*/

  /*
  window.Order = Backbone.Model.extend({
    initialize: function(){
      this.bind("change:order",function(){
        var order = this.get("order");
        alert("Changed order to " + order ". Update server");
      });
    },
    changeOrder: function(order){
      this.set({order: order});
    }
  });

  
  var orderOne = new Order ({order: "A Lvp-Cly", userID: 170});
  orderOne.changeOrder("A Lvp-Wal");
  var orderTwo = new Order ({order: "F NAt-Nrg", userID: 170});
  var orderThree = new Order ({order: "F Cly S NAt-Nrg", userID: 170});
  

  window.OrderView = Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      var template = _.template("<span class='order'><%= order %> </span><input type='button',id='deleteorder',value='Delete'/>")
      this.el.html(template);
      return this;
    },

  });

  var orders = new OrderCollection([orderOne,orderTwo,orderThree]);

  window.OrderCollection = Backbone.Collection.extend({
    model: Order;
  });



  window.OrderView = Backbone.View.extend({
    initialize: function(){
        
    }
    el: $("#orders");
    events: {
      "click input[type=button]": "doDelete";
    },
    doDelete: function (event){
      $(view.el).remove()
    }
  });

  var orderView = new OrderView({el:$("orders")});
  */

});