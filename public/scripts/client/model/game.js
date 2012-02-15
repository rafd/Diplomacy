define(['scripts/client/bootstrap.js'], function(){
  
  window.Game = Backbone.RelationalModel.extend({
    urlRoot: 'game',
    relations: [
      {
        type: 'HasMany',
        key: 'chatrooms',
        relatedModel: 'ChatRoom',
        collectionType: 'ChatRoomCollection',
        includeInJSON: Backbone.Model.prototype.idAttribute
      },
      {
        type: 'HasMany',
        key: 'players',
        relatedModel: 'Player',
        collectionType: 'PlayerCollection',
        includeInJSON: Backbone.Model.prototype.idAttribute
        
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
        includeInJSON: Backbone.Model.prototype.idAttribute
      }
    ],
    initialize: function(spec){
      // if no ID, create a game from scratch
      if(spec['_id'] == undefined) {
        console.log("new game")

        this.set({
          name: spec.name || "Game "+Math.floor(100*Math.random()),
          created_at: new Date().getTime()
        });

        //console.log("new game, creating associations...")
        this.get('chatrooms').create();
        this.get('chatrooms').create();

        // create units for each player

        this.get('units').add(starting_locations);

        // TODO: create local user

        // TODO: should loop through this
        this.get('players').create({power:"Aus", user: window.user});
        this.get('players').create({power:"Fra", user: RemoteUsers.at(1)});
        this.get('players').create({power:"Ger", user: RemoteUsers.at(2)});
        this.get('players').create({power:"Ita", user: RemoteUsers.at(3)});
        this.get('players').create({power:"Rus", user: RemoteUsers.at(4)});
        this.get('players').create({power:"Tur", user: RemoteUsers.at(5)});
        this.get('players').create({power:"Eng", user: RemoteUsers.at(6)});

      // else, generate from spec
      } else {
        console.log("existing game")

        this.fetchRelated('chatrooms');
        this.fetchRelated('players');
        //this.fetchRelated('units');
        //this.fetchRelated('turns');
        
      }
    }
  });

  GameCollection = Backbone.Collection.extend({
    model: Game,
    url: 'game'
  });


});