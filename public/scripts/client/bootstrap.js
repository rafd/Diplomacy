define([
  "order!scripts/vendor/underscore.min.js"
  , "order!scripts/vendor/backbone.min.js"
  , "order!scripts/vendor/backbone-relational.js"
  , "order!scripts/vendor/sync.js"
  //, "order!scripts/vendor/sync.js"
  //, "order!scripts/vendor/localstorage.js"
  , "order!scripts/vendor/hogan.js"
  , "order!scripts/client/templates.js"
  , "socket.io"
], function(){

  Backbone.Model.prototype.idAttribute = "_id"


  window.Helpers = {};

  Helpers.random_from = function(arr){
    return arr[Math.floor(Math.random() * arr.length)]
  } 

  Backbone.Collection.prototype.toData = function(){
    return this.map(function(model){ return model.toData(); });
  }

  Backbone.RelationalModel.prototype.toData = function() {
      // If this Model has already been fully serialized in this branch once, return to avoid loops
      if ( this.isLocked() ) {
        return this.id;
      }

      this.acquire();
      var json = Backbone.Model.prototype.toJSON.call( this );

      _.each( this._relations, function( rel ) {
          var value = json[ rel.key ];

          if (value && _.isFunction( value.toJSON ) ) {
            json[ rel.key ] = value.toData();
          }
          else if ( _.isString( rel.options.includeInJSON ) ) {
            if ( value instanceof Backbone.Collection ) {
              json[ rel.key ] = value.toData();
            }
            else if ( value instanceof Backbone.Model ) {
              json[ rel.key ] = value.toData();
            }
          }
          else {
            delete json[ rel.key ];
          }
        }, this );

      this.release();
      return json;
    }

});