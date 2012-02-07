define(['scripts/client/bootstrap.js'], function(){
  
  window.Game = Backbone.RelationalModel.extend({
    urlRoot: 'games',
    relations: [
      {
        type: 'HasMany',
        key: 'chatrooms',
        relatedModel: 'ChatRoom',
        collectionType: 'ChatRoomCollection',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'game'
        }
      },
      {
        type: 'HasMany',
        key: 'players',
        relatedModel: 'Player',
        collectionType: 'PlayerCollection',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'game'
        }
      },
      {
        type: 'HasMany',
        key: 'units',
        relatedModel: 'Unit',
        collectionType: 'UnitCollection',
        includeInJSON: true
      },
      {
        type: 'HasMany',
        key: 'turns',
        relatedModel: 'Turn',
        collectionType: 'TurnCollection',
        includeInJSON: 'id',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'game'
        }
      }
    ],
    initialize: function(spec){
      // if no ID, create a game from scratch
      if(spec['id'] == undefined) {
        this.set({
          name: spec.name || "Game "+Math.floor(100*Math.random()),
          created_at: new Date().getTime()
        });

        //console.log("new game, creating associations...")
        this.get('chatrooms').create();
        this.get('chatrooms').create();

        // create units for each player

        this.get('units').add(starting_locations);

        //this.get('units').create();
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

  GameCollection = Backbone.Collection.extend({
    model: Game,
    url: "games"
  });


});