define(['scripts/client/bootstrap.js'], function(){

  window.User = Backbone.RelationalModel.extend({
    urlRoot: 'users',
    /*relations: [
      {
        type: 'HasMany',
        key: 'games',
        relatedModel: 'Game',
        collectionType: 'Games',
        includeInJSON: "id"
      }
    ],*/
    initialize: function(spec){
      /*if(spec['id'] == undefined){
        // 
      } else {
        if(spec.games){
          _.each(spec.games, function(game_id) {
            this.get('messages').create({_id: game_id});
          }, this);
        }
      }*/
      this.set({
        name: this.get('name') || Math.floor(Math.random()*1001)
      });
    },
    join_chat: function(){
      Socket.emit('chat:connect', this.toJSON());
    }
  });

  
  /*
  window.CurrentUser = new (Backbone.Collection.extend({
    model: User,
    initialize: function() {
      this.fetch();
    }
  }))();
  */

});