exports.create = function(mongoose) {

  return mongoose.model('OrderSet', new mongoose.Schema({orders:[]}));

}
