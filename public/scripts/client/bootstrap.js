define([
  "order!scripts/vendor/underscore.min.js"
  , "order!scripts/vendor/backbone.min.js"
  , "order!scripts/vendor/backbone-relational.js"
  , "order!scripts/vendor/sync.js"
  , "scripts/vendor/kite.js"
  , "socket.io"
], function(){

  Backbone.Model.prototype.idAttribute = "_id"

});