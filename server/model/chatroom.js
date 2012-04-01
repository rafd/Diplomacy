exports.create = function(mongoose) {

 var new_schema = new mongoose.Schema();

  new_schema.add({
      messages:[],
      class:"",
      id:[],//superfluous?
      players:[],
    });

  return mongoose.model('ChatRoom', new_schema);

  // return mongoose.model('ChatRoom', new mongoose.Schema({}));

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
