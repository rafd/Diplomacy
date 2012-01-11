define(['scripts/client/bootstrap.js'], function(){

  window.Order=Backbone.Model.extend({
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

  var orderOne=new Order ({order: "A Lvp-Cly", userID: 170});
  orderOne.changeOrder("A Lvp-Wal");
  var orderTwo=new Order ({order: "F NAt-Nrg", userID: 170});
  var orderThree=new Order ({order: "F Cly S NAt-Nrg", userID: 170});

  window.OrderView=Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      var template = _.template("<span class='order'><%= order %> </span><input type='button',id='deleteorder',value='Delete'/>")
      this.el.html(template);
      return this;
    },

  });

  var orders=new OrdersCollection([orderOne,orderTwo,orderThree]);

  window.OrdersCollection = Backbone.Collection.extend({
    model: Order;
  });



  window.OrdersView=Backbone.View.extend({
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

  var orderView=new OrdersView({el:$("orders")});

});