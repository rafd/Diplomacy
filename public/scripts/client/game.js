define(['scripts/client/bootstrap.js'], function(){
  Game = Backbone.Model.extend({
    initialize: function(spec){
      this.set({
        //htmlID: 'game_' + this.cid,
        created_at: this.get('created_at') || new Date().getTime()
      });
    }
  });

  GameView = Backbone.View.extend({
    tagName: 'div',
    template: _.template("<a href='#' class='game-link'><%- name %> </a>"),
    renderLink: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  window.Games = new (Backbone.Collection.extend({
    model: Game,
    localStorage: new Store("games")
    
  }))();
});