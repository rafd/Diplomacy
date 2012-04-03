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
          created_at: new Date().getTime(),
          status: "pregame"
        });



        // create units for each player

        this.get('units').add(starting_locations);

        user_index = [1,2,3,4,5,6,7,8,9,10,11]
        user_index.sort(function() {return 0.5 - Math.random()})

        // TODO: should loop through this
        this.get('players').create({power:"Aus", user: window.user});
        this.get('players').create({power:"Fra", user: RemoteUsers.at(user_index[0])});
        this.get('players').create({power:"Ger", user: RemoteUsers.at(user_index[1])});
        this.get('players').create({power:"Ita", user: RemoteUsers.at(user_index[2])});
        this.get('players').create({power:"Rus", user: RemoteUsers.at(user_index[3])});
        this.get('players').create({power:"Tur", user: RemoteUsers.at(user_index[4])});
        // this.get('players').create({power:"Eng", user: RemoteUsers.at(6)});

        // create chatrooms using player permutations 
        // _.each(this.get('players').permutations(), function(pair){
        //   this.get('chatrooms').create({players: [pair[0].id, pair[1].id]})
        // }, this);

        // create global chatroom
        this.get('chatrooms').create({players: this.get('players').pluck('_id')});

      } 
      // else, generate from spec
      else {
        console.log("existing game")

        this.fetchRelated('chatrooms');
        this.fetchRelated('players');
        //this.fetchRelated('units');
        //this.fetchRelated('turns');
        
      }
      this.get('players').bind("remove", function(){this.save()}, this)
      this.get('players').bind("add", function(){this.save()}, this)
      this.get('players').bind("change", function(){this.save()}, this)
    },
    turnLabel: function(){
      turn = this.get('turn') || 1 //remove || ... once merged
      state = this.get('state') || "primary" //remove || ... once merged
      season = ""
      if(state == "primary")
        season = (turn % 2) ? "Spring" : "Fall";
      else
        season = (turn % 2) ? "Summer" : "Winter";
      
      year = 1900 + Math.floor(turn/2)

      return season + " " + year
    }
  });

  GameCollection = Backbone.Collection.extend({
    model: Game,
    url: 'game'
  });


});