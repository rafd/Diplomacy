/*

Game

  belongs_to: user
  embeds_many: players
  
game = {
  id: ID,
  settings: {}
  state: ""
  players: [ 
    playerObj,
    playerObj
  ],
  owner_id: ID
  chatrooms: {
    0: ID,
    12: ID,
    23: ID
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
