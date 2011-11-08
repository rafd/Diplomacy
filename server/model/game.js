/*

Game

  belongs_to: user
  embeds_many: players
  
game = {
  id: ID,
  settings: {}
  state: ""
  players: { 
    1: playerObj,
    2: playerObj,
    3: playerObj, 
    4: playerObj, 
    5: playerObj, 
    6: playerObj
    7: playerObj,
  },
  owner_id: ID
  chatrooms: {
    0: ID,
    12: ID,
    13: ID,
    14: ID,
    15: ID,
    16: ID,
    17: ID,
    23: ID,
    24: ID,
    25: ID,
    26: ID,
    27: ID,
    34: ID,
    35: ID,
    36: ID,
    37: ID,
    45: ID,
    46: ID,
    47: ID,
    56: ID,
    57: ID,
    67: ID
  }
}

game.owner = function(){
  User.find(this.owner_id)
}

*/



/*

Player
  embedded_in: game


player = {
  id: ID
  user_id: ID
  country: ""
}

player.user = function(){
  User.find(this.user_id)
}

*/
