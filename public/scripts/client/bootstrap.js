define([
  "order!scripts/vendor/underscore.min.js"
  , "order!scripts/vendor/backbone.min.js"
  , "order!scripts/vendor/backbone-relational.js"
  , "order!scripts/vendor/dropsync.js"
  //, "order!scripts/vendor/sync.js"
  //, "order!scripts/vendor/localstorage.js"
  , "order!scripts/vendor/hogan.js"
  , "order!scripts/client/templates.js"
  , "socket.io"
], function(){

  Backbone.Model.prototype.idAttribute = "_id"

});