define(['scripts/client/bootstrap.js'], function(){
  
  window.Game = Backbone.RelationalModel.extend({
    urlRoot: 'games',
    relations: [
      {
        type: 'HasMany',
        key: 'chatrooms',
        relatedModel: 'ChatRoom',
        collectionType: 'ChatRooms',
        includeInJSON: 'id'
      },
      {
        type: 'HasMany',
        key: 'players',
        relatedModel: 'Player',
        collectionType: 'Players',
        includeInJSON: 'id'
      }
    ],
    initialize: function(spec){
      // if no ID, create a game from scratch
      if(spec['id'] == undefined) {
        this.set({
          created_at: new Date().getTime()
        });

        console.log("new game, creating associations...")
        this.get('chatrooms').create();
        this.get('chatrooms').create();

        this.get('players').create();
      // else, generate from spec
      } else {
        /*
        console.log('existing game, recreating associations...')
        _.each(spec.chatrooms, function(id) {
          this.get('chatrooms').create({_id:id});
        }, this);
        _.each(spec.players, function(id) {
          this.get('players').create({_id:id});
        }, this);
        */
      }
    }
  });


  window.GameCollection = Backbone.Collection.extend({
    url: 'games',
    model: Game
  });

  window.Games = new GameCollection();

});