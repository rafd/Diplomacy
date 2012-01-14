(function() {
window.T = window.T || {};
window.T["board"] = new HoganTemplate();
window.T["board"].r = function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div id=\"map\"></div>";b += "\n" + i;b += "<div id=\"side\">";b += "\n" + i;b += "  ";b += (_.v(_.f("name",c,p,0)));b += "\n" + i;b += "  <p>Connected Users:</p>";b += "\n" + i;b += "  <div id=\"users\"></div>";b += "\n" + i;b += "  <a class=\"exit\" href=\"#\">go to lobby</a>";b += "\n" + i;b += "  <a class=\"delete\" href=\"#\">delete game</a>";b += "\n" + i;b += "</div>";return b;;}
window.T["chat"] = new HoganTemplate();
window.T["chat"].r = function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<li>";b += "\n" + i;b += "  <p>Hi I&apos;m <a href=\"http://twitter.com/";b += (_.v(_.f("twitter",c,p,0)));b += "\">@";b += (_.v(_.f("twitter",c,p,0)));b += "</a></p>";b += "\n" + i;b += "  <p>I work for ";b += (_.v(_.f("employer",c,p,0)));b += " as a ";b += (_.v(_.f("job_title",c,p,0)));b += ".</p>";b += "\n" + i;b += "</li>";return b;;}
window.T["chatroom"] = new HoganTemplate();
window.T["chatroom"].r = function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class='messages'>";b += "\n" + i;b += "</div>";b += "\n" + i;b += "<form>";b += "\n" + i;b += "  <input placeholder='chat here' type='text' />";b += "\n" + i;b += "  <input type='submit' class=\"submit\"/>";b += "\n" + i;b += "</form>";return b;;}
window.T["game"] = new HoganTemplate();
window.T["game"].r = function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<a href='#' class='game-link'>";b += (_.v(_.f("name",c,p,0)));b += "</a>";return b;;}
window.T["lobby"] = new HoganTemplate();
window.T["lobby"].r = function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<p>This is the lobby.</p>";b += "\n" + i;b += "<form id=\"new-game\">";b += "\n" + i;b += "  <input id=\"new-game-input\" placeholder=\"new game name\" type=\"text\" />";b += "\n" + i;b += "  <input id=\"create-game\" type=\"submit\" />";b += "\n" + i;b += "</form>";return b;;}
window.T["message"] = new HoganTemplate();
window.T["message"].r = function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<span class='username'>";b += (_.v(_.f("username",c,p,0)));b += ": </span>";b += "\n" + i;b += "<span class='content'>";b += (_.v(_.f("content",c,p,0)));b += "</span>";return b;;}

})();