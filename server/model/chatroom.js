exports.create = function(mongoose) {

  return mongoose.model('ChatRoom', new mongoose.Schema({}));

}

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
