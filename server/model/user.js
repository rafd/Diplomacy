var create = function(mongoose) {
  
  var Schema = mongoose.Schema

  var user_schema = new Schema({
    name: String
  });

  return mongoose.model('User', user_schema)

}

exports.create = create

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



