require(
{
  paths: {
    "order":"vendor/order.min"
  }
},
[
  "order!scripts/app.js"
  ,"order!scripts/test/lib/qunit.js"
  ,"order!scripts/test/lib/syn/syn.js"
  ,"order!scripts/test/tests.js"
], function() {

    QUnit.log = function(params){//result, actual, expected, message
    console.log("test:"+params.message);
    if(!params.result){
      console.log("test:"+'\texp: '+params.expected+'\n\tact: '+params.actual)
    }
  };
  

});