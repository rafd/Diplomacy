var create = function(mongoose) {

  var Schema = mongoose.Schema;

  var message_schema = new Schema({
    id: Schema.ObjectId
    , user_id: Schema.ObjectId
    , content: String
    , created_at: Date
  })

  var chatroom_schema = new Schema({
    id: Schema.ObjectId
    , game_id: Schema.ObjectId
    , user_id: Schema.ObjectId
    , messages: [message_schema]
  })

  return mongoose.model('Chatroom', chatroom_schema);

}


exports.create = create
/*

data = {
  username: 
  created_at:
  id:
  content:
}


chatroom={
	id: UID,
	game: gameID,
	participants: playerID,
	messages: {
		messageID,
		messageID
	}
}

messages={
	id: UID,
	from: playerID,
	timestamp: int,
	content: ""
}

*/
