(function() {
window.T = window.T || {};
window.T["board"] = new HoganTemplate();
window.T["board"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<div id=\"map\"></div>";b += "\n";b += "<div id=\"side\">";b += "\n";b += "  ";b += (_.v(_.f("name",c,p,0)));b += "\n";b += "  <p>Connected Users:</p>";b += "\n";b += "  <div id=\"users\"></div>";b += "\n";b += "  <a class=\"exit\" href=\"#\">go to lobby</a>";b += "\n";b += "  <a class=\"delete\" href=\"#\">delete game</a>";b += "\n";b += "</div>";return b;;}
window.T["chat"] = new HoganTemplate();
window.T["chat"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<li>";b += "\n";b += "  <p>Hi I&apos;m <a href=\"http://twitter.com/";b += (_.v(_.f("twitter",c,p,0)));b += "\">@";b += (_.v(_.f("twitter",c,p,0)));b += "</a></p>";b += "\n";b += "  <p>I work for ";b += (_.v(_.f("employer",c,p,0)));b += " as a ";b += (_.v(_.f("job_title",c,p,0)));b += ".</p>";b += "\n";b += "</li>";return b;;}
window.T["chatroom"] = new HoganTemplate();
window.T["chatroom"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<div class='messages'>";b += "\n";b += "</div>";b += "\n";b += "<form>";b += "\n";b += "  <input placeholder='chat here' type='text' />";b += "\n";b += "  <input type='submit' class=\"submit\"/>";b += "\n";b += "</form>";return b;;}
window.T["game"] = new HoganTemplate();
window.T["game"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<a href='#' class='game-link'>";b += (_.v(_.f("name",c,p,0)));b += "</a>";return b;;}
window.T["lobby"] = new HoganTemplate();
window.T["lobby"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<form id=\"new-game\">";b += "\n";b += "  <input id=\"new-game-input\" placeholder=\"new game name\" type=\"text\" />";b += "\n";b += "  <input id=\"create-game\" type=\"submit\" />";b += "\n";b += "</form>";return b;;}
window.T["map"] = new HoganTemplate();
window.T["map"].r = function(cx,p){var c = [cx];var b = "";var _ = this;if(_.s(_.f("units",c,p,1),c,p,0,10,61)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";b += "\n";b += "  ";b += (_.v(_.f("owner",c,p,0)));b += "\n";b += "  ";b += (_.v(_.f("utype",c,p,0)));b += "\n";b += "  ";b += (_.v(_.f("province",c,p,0)));b += "\n";b += "</li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};return b;;}
window.T["message"] = new HoganTemplate();
window.T["message"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<span class='username'>";b += (_.v(_.f("username",c,p,0)));b += ": </span>";b += "\n";b += "<span class='content'>";b += (_.v(_.f("content",c,p,0)));b += "</span>";return b;;}
window.T["order_submit"] = new HoganTemplate();
window.T["order_submit"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<ul>";b += "\n";if(_.s(_.f("units",c,p,1),c,p,0,15,231)){b += _.rs(c,p,function(c,p){ var b = "";b += "  <li>";b += "\n";b += "    ";b += (_.v(_.f("province",c,p,0)));b += "\n";b += "    <select>";b += "\n";b += "      <option>hold</option>";b += "\n";b += "      <option>move</option>";b += "\n";b += "      <option>support</option>";b += "\n";b += "    </select>";b += "\n";b += "\n";b += "    to:";b += "\n";b += "    ";b += "\n";b += "    <select>";b += "\n";b += "      <option>TODO</option>";b += "\n";b += "    </select>";b += "\n";b += "  </li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</ul>";return b;;}
window.T["players"] = new HoganTemplate();
window.T["players"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "Players:";b += "\n";b += "<ul>";b += "\n";if(_.s(_.f("players",c,p,1),c,p,0,26,75)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";b += (_.v(_.f("power",c,p,0)));b += " (";if(_.s(_.f("user",c,p,1),c,p,0,51,59)){b += _.rs(c,p,function(c,p){ var b = "";b += (_.v(_.f("name",c,p,0)));return b;});c.pop();}else{b += _.b; _.b = ""};b += ")</li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</ul>";return b;;}
window.T["splash"] = new HoganTemplate();
window.T["splash"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<form id=\"user-login\">";b += "\n";b += "  <input class=\"email\" placeholder=\"email\" type=\"text\" /> <br />";b += "\n";b += "  <input class=\"name\" placeholder=\"name\" type=\"text\" /> <br />";b += "\n";b += "  <!--<input class=\"password\" type=\"password\" placeholder=\"passphrase\"/> <br /> -->";b += "\n";b += "  <input id=\"logIn\" type=\"submit\" value=\"start playing\"/>";b += "\n";b += "</form>";return b;;}
window.T["user"] = new HoganTemplate();
window.T["user"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += (_.v(_.f("name",c,p,0)));b += "\n";b += "<img src=\"";b += (_.v(_.f("avatar",c,p,0)));b += "\"/>";return b;;}
window.T["users"] = new HoganTemplate();
window.T["users"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "Other Users:";b += "\n";b += "<ul>";b += "\n";if(_.s(_.f("users",c,p,1),c,p,0,28,47)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";b += (_.v(_.f("name",c,p,0)));b += "</li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</ul>";return b;;}

})();