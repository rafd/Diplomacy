define(['scripts/client/bootstrap.js'], function(){

  SplashView = Backbone.View.extend({
    template: T['splash'],
    className: 'splash',
    events: {
      "click #logIn":"logIn"
    },
    initialize: function(){
      $(this.el).html(this.template.r({}));

      this.name = $(this.el).find("form input.name");

      $('#diplomacy').append(this.el);

      if(localStorage.name){
        this.logIn();
      }
      
    },
    logIn: function(e){
      if(e) { e.preventDefault(); } //TODO: this shouldn't be necessary
      
      info = {name: localStorage.name || this.name.val() };
      // TODO: passphrase needs to be sent securely
      // TODO: check the passphrase

      
      socket.emit('user:login',info, function(err,data){ 
        // create local user object
        window.user = new User(data);

        // store in localstorage
        localStorage.name = data.name;

        // switch to lobby
        Lobby = new LobbyView();
      });

      $(this.el).remove();

    }
  });

});