define(['scripts/client/bootstrap.js'], function(){

  SplashView = Backbone.View.extend({
    template: T['splash'],
    className: 'splash',
    events: {
      "click #logIn":"logIn"
    },
    initialize: function(){
      $(this.el).html(this.template.r({}));

      this.email = $(this.el).find("form input.email");
      this.name = $(this.el).find("form input.name");

      if(localStorage.email){
        this.email.val(localStorage.email);
      }

      $('#diplomacy').append(this.el);
    },
    logIn: function(e){
      info = {email: this.email.val(), name: this.name.val()};
      // TODO: passphrase needs to be sent securely
      // TODO: check the passphrase
      socket.emit('user:login',info, function(err,data){ 
        // create local user object
        window.user = new User(data);

        // store in localstorage
        localStorage.email = data.email;

        // switch to lobby
        Lobby = new LobbyView();
      });

      $(this.el).remove();

    }
  });

});