define(['scripts/client/bootstrap.js'], function(){

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
        htmlId: 'event_' + this.cid
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

  window.EventView = Backbone.View.extend({
    tagName: "div",
    template: _.template("<%= content %>"),
    events: {
      "click" : "remove"
    },
    initialize: function() {
      // bindings
    },
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    remove: function() {
      alert('i been clicked!');
    }
  });

  // COLLECTIONS

  window.Events = Backbone.Collection.extend({
    model: Event,
    localStorage: new Store("events"),
    /*all: function(){
      return this;
    },*/
    initialize: function() {
      //
    }
  });

  window.EventLog = new Events();

  // VIEWS





  // APP

  window.AppView = Backbone.View.extend({
    el: $("#diplomacyapp"),
    events: {
      "keypress #new-event":  "createOnEnter"
    },
    initialize: function() {
      this.input = this.$("#new-event");

      EventLog.bind('add', this.addOne, this);
      EventLog.bind('reset', this.addAll, this);
      EventLog.bind('all', this.render, this);

      EventLog.fetch();
    },
    render: function() {
    },
    addOne: function(m) {
      var view = new EventView({model: m});
      this.$("#eventlog").append(view.render().el);
    },
    addAll: function() {
      EventLog.each(this.addOne);
    },
    createOnEnter: function(e) {
      var content = this.input.val();
      if (!content || e.keyCode != 13) return;
      EventLog.create({content: content});
      this.input.val('');
    }

  });

  window.App = new AppView();

});