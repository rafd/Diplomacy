function user(Schema, mongoose) {
  var user_schema = new Schema({
    name: String
  });

  var User = new mongoose.Model('User', user_schema);
}
module.exports.user = user;
/*

User

  has_many: games
  has_many: owned_games


user = {
  id: ID
}




*/



