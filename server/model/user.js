exports.create = function(mongoose) {

 var new_schema = new mongoose.Schema();

  new_schema.add({
      name:"",
      email:"",
    });

  return mongoose.model('User', new_schema);

  // return mongoose.model('User', new mongoose.Schema({}));

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



