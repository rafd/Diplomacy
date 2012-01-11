/*

Game

  belongs_to: user
  embeds_many: players
  
game = {
  id: ID,
  settings: {},
  state: "",

  units: {},
  supply: {},
  orders: [],

  players: { 
    1: player,
    2: player,
    3: player, 
    4: player, 
    5: player, 
    6: player,
    7: player
  },
  owner_id: ID,
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
  id: ID,
  user_id: ID,
  country: "",
}

player.user = function(){
  User.find(this.user_id)
}

*/



/*
unit =
{
  owner: "";//"Eng"
  province: "";//"Edi"
  utype: "";//army or fleet

  order = {
    move: "";//move, support, convoy, hold, retreat
    from: "";//"Edi"
    to: "";//"Lvp"
    tag: "";//string: invalid, sup_cut, success, cant_swap, lost, tied, RETREAT
    support: "";//integer
    nohelp: "";//array
  }
}


    //check: if unit is dislodged when supporting an attack but the attacker attacks back, cut support
    //check: cannot dislodge your own unit

*/
