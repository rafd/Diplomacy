exports.create = function(mongoose) {

  return mongoose.model('User', new mongoose.Schema({}));

}

/*

User

  has_many: games
  has_many: owned_games


user = {
  id: ID
  current_games: {
  	gameID,
  	gameID
  }
  past_games:{
  	gameID,
  	gameID
  }
}




*/



