require(["jquery", "scripts/vendor/underscore.min.js", "scripts/vendor/backbone.min.js", "scripts/vendor/backbone-localstorage.js","scripts/vendor/ICanHaz.min.js"], function($) {
  $(function() {

    window.Event = Backbone.Model.extend({
      defaults: function(){
        return {
          content: 'default content'
        }
      },
      initialize: function (spec) {
        if (!spec || !spec.content) {
          throw "InvalidConstructArgs";
        }
        this.set({
            htmlId: 'logitem_' + this.cid
        });
      },
      validate: function (attrs) {
        if (attrs.content) {
          if (!_.isString(attrs.content) || attrs.content.length === 0 ) {
            return "Title must be a string with a length";
          }
        }
      }
    });


    // COLLECTIONS

    window.LogItems = Backbone.Collection.extend({
      model: LogItem,
      localStorage: new Store("logitems"),
      /*all: function(){
        return this;
      },*/
      initialize: function() {
        //
      }
    });

    window.Log = new LogItems();

    // VIEWS

    window.LogView = Backbone.View.extend({
      tagName: "div",
      template: _.template("<%= content %>"),
      events: {
        "click" : "alert"
      },
      initialize: function() {
        // bindings
      },
      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      },
      alert: function() {
        alert('i been clicked!');
      }
    });



    // APP

    window.AppView = Backbone.View.extend({
      el: $("#diplomacyapp"),
      events: {
        "keypress #new-logitem":  "createOnEnter",
        "keyup #new-logitem": "console"
      },
      initialize: function() {
        this.input = this.$("#new-logitem");

        Log.bind('add', this.addOne, this);
        Log.bind('reset', this.addAll, this);
        Log.bind('all', this.render, this);

        Log.fetch();
      },
      render: function() {
      },
      addOne: function(logitem) {
        var view = new LogView({model: logitem});
        this.$("#log").append(view.render().el);
      },
      addAll: function() {
        Log.each(this.addOne);
      },
      createOnEnter: function(e) {
        var content = this.input.val();
        if (!content || e.keyCode != 13) return;
        Log.create({content: content});
        this.input.val('');
      },
      console: function() {
        console.log('keyup, bitch');
      }

    });


    window.App = new AppView();


  });
});
