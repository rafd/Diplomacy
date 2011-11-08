Backbone.sync = function(method, model, options) {
    if(typeof model.cid != 'undefined') {
        // It's a freshly made model
        var cid = model.cid;
        // ..fake that it's .cid turns into a "real" .id:
        model.unset('cid').set({id:cid}, {silent:true});
    }
    // Oh yes, it all went sooo well ;-)
    options.success(model);
};
