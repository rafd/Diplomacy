(function() {
window.T = window.T || {};
window.T["board"] = new HoganTemplate();
window.T["board"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<div id=\"map\"></div>";b += "\n";b += "<div id=\"side\">";b += "\n";b += "  ";b += (_.v(_.f("name",c,p,0)));b += "\n";b += "  <p>Connected Users:</p>";b += "\n";b += "  <div id=\"users\"></div>";b += "\n";b += "  <a class=\"exit\" href=\"#\">go to lobby</a>";b += "\n";b += "  <a class=\"delete\" href=\"#\">delete game</a>";b += "\n";b += "</div>";return b;;}
window.T["chat"] = new HoganTemplate();
window.T["chat"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<li>";b += "\n";b += "  <p>Hi I&apos;m <a href=\"http://twitter.com/";b += (_.v(_.f("twitter",c,p,0)));b += "\">@";b += (_.v(_.f("twitter",c,p,0)));b += "</a></p>";b += "\n";b += "  <p>I work for ";b += (_.v(_.f("employer",c,p,0)));b += " as a ";b += (_.v(_.f("job_title",c,p,0)));b += ".</p>";b += "\n";b += "</li>";return b;;}
window.T["chatroom"] = new HoganTemplate();
window.T["chatroom"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<div class='messages'>";b += "\n";b += "</div>";b += "\n";b += "<form>";b += "\n";b += "  <input placeholder='chat here' type='text' />";b += "\n";b += "  <input type='submit' class=\"submit\" value = \"Send\"/>";b += "\n";b += "</form>";return b;;}
window.T["chatrooms"] = new HoganTemplate();
window.T["chatrooms"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<ul>";b += "\n";if(_.s(_.f("chatrooms",c,p,1),c,p,0,19,66)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";if(_.s(_.f("players",c,p,1),c,p,0,36,47)){b += _.rs(c,p,function(c,p){ var b = "";b += "\n";b += (_.v(_.f("power",c,p,0)));b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</ul>";return b;;}
window.T["game"] = new HoganTemplate();
window.T["game"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<a href='#' class='game-link'>";b += (_.v(_.f("name",c,p,0)));b += "</a>";b += "\n";if(_.s(_.f("players",c,p,1),c,p,0,57,85)){b += _.rs(c,p,function(c,p){ var b = "";if(_.s(_.f("user",c,p,1),c,p,0,67,75)){b += _.rs(c,p,function(c,p){ var b = "";b += (_.v(_.f("name",c,p,0)));return b;});c.pop();}else{b += _.b; _.b = ""};b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};return b;;}
window.T["lobby"] = new HoganTemplate();
window.T["lobby"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<form id=\"new-game\">";b += "\n";b += "  <input id=\"new-game-input\" placeholder=\"new game name\" type=\"text\" />";b += "\n";b += "  <input id=\"create-game\" type=\"submit\" />";b += "\n";b += "</form>";return b;;}
window.T["map"] = new HoganTemplate();
window.T["map"].r = function(cx,p){var c = [cx];var b = "";var _ = this;if(_.s(_.f("units",c,p,1),c,p,0,10,61)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";b += "\n";b += "  ";b += (_.v(_.f("owner",c,p,0)));b += "\n";b += "  ";b += (_.v(_.f("utype",c,p,0)));b += "\n";b += "  ";b += (_.v(_.f("province",c,p,0)));b += "\n";b += "</li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};return b;;}
window.T["message"] = new HoganTemplate();
window.T["message"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<span class='username'>";b += (_.v(_.f("username",c,p,0)));b += ": </span>";b += "\n";b += "<span class='content'>";b += (_.v(_.f("content",c,p,0)));b += "</span>";return b;;}
window.T["order_submit"] = new HoganTemplate();
window.T["order_submit"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<form>";b += "\n";b += "  <ul>";b += "\n";b += "  <input type=\"submit\" class=\"submit\" value = \"Submit moves\"/>";b += "\n";if(_.s(_.f("units",c,p,1),c,p,0,89,462)){b += _.rs(c,p,function(c,p){ var b = "";b += "    <li>";b += "\n";b += "      <input name=\"owner\" type=\"hidden\" value=\"";b += (_.v(_.f("owner",c,p,0)));b += "\"/>";b += "\n";b += "      ";b += (_.v(_.f("utype",c,p,0)));b += "\n";b += "      <input name=\"utype\" type=\"hidden\" value=\"";b += (_.v(_.f("utype",c,p,0)));b += "\"/>";b += "\n";b += "      ";b += (_.v(_.f("province",c,p,0)));b += "\n";b += "      <input name=\"prov\" type=\"hidden\" value=\"";b += (_.v(_.f("province",c,p,0)));b += "\"/>";b += "\n";b += "      <select class=\"move\" name=\"move\">";b += "\n";b += "       <option>h</option>";b += "\n";b += "       <option>m</option>";b += "\n";b += "       <option>s</option>";b += "\n";b += "      </select>";b += "\n";b += "    </li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "  </ul>";b += "\n";b += "</form>";return b;;}
window.T["order_submit_unit"] = new HoganTemplate();
window.T["order_submit_unit"].r = function(cx,p){var c = [cx];var b = "";var _ = this;if(_.s(_.f("units",c,p,1),c,p,0,10,807)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";b += "\n";b += "      <input name=\"owner\" type=\"hidden\" value=\"";b += (_.v(_.f("owner",c,p,0)));b += "\"/>";b += "\n";b += "      ";b += (_.v(_.f("utype",c,p,0)));b += "\n";b += "      <input name=\"utype\" type=\"hidden\" value=\"";b += (_.v(_.f("utype",c,p,0)));b += "\"/>";b += "\n";b += "      ";b += (_.v(_.f("province",c,p,0)));b += "\n";b += "      <input name=\"prov\" type=\"hidden\" value=\"";b += (_.v(_.f("province",c,p,0)));b += "\"/>";b += "\n";b += "      <select class=\"move\" name=\"move\">";b += "\n";b += "       <option ";if(_.s(_.f("move_h",c,p,1),c,p,0,299,307)){b += _.rs(c,p,function(c,p){ var b = "";b += "selected";return b;});c.pop();}else{b += _.b; _.b = ""};b += ">h</option>";b += "\n";b += "       <option ";if(_.s(_.f("move_m",c,p,1),c,p,0,356,364)){b += _.rs(c,p,function(c,p){ var b = "";b += "selected";return b;});c.pop();}else{b += _.b; _.b = ""};b += ">m</option>";b += "\n";b += "       <option ";if(_.s(_.f("move_s",c,p,1),c,p,0,413,421)){b += _.rs(c,p,function(c,p){ var b = "";b += "selected";return b;});c.pop();}else{b += _.b; _.b = ""};b += ">s</option>";b += "\n";b += "      </select>";b += "\n";b += "      ";b += "\n";if (!_.s(_.f("move_h",c,p,1),c,p,1,0,0)){b += "      ";b += "\n";if(_.s(_.f("from?",c,p,1),c,p,0,508,627)){b += _.rs(c,p,function(c,p){ var b = "";b += "      <select name=\"from\">";b += "\n";if(_.s(_.f("from",c,p,1),c,p,0,553,595)){b += _.rs(c,p,function(c,p){ var b = "";b += "          <option>";b += (_.v(_.d(".",c,p,0)));b += "</option>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "      </select>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "      ";b += "\n";if(_.s(_.f("to?",c,p,1),c,p,0,659,772)){b += _.rs(c,p,function(c,p){ var b = "";b += "      <select name=\"to\">";b += "\n";if(_.s(_.f("to",c,p,1),c,p,0,700,742)){b += _.rs(c,p,function(c,p){ var b = "";b += "          <option>";b += (_.v(_.d(".",c,p,0)));b += "</option>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "      </select>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "\n";};b += "\n";b += "</li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};return b;;}
window.T["players"] = new HoganTemplate();
window.T["players"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "Players:";b += "\n";b += "<ul>";b += "\n";if(_.s(_.f("players",c,p,1),c,p,0,26,75)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";b += (_.v(_.f("power",c,p,0)));b += " (";if(_.s(_.f("user",c,p,1),c,p,0,51,59)){b += _.rs(c,p,function(c,p){ var b = "";b += (_.v(_.f("name",c,p,0)));return b;});c.pop();}else{b += _.b; _.b = ""};b += ")</li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</ul>";return b;;}
window.T["players_pregame"] = new HoganTemplate();
window.T["players_pregame"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "Players:";b += "\n";b += "<ul>";b += "\n";if(_.s(_.f("players",c,p,1),c,p,0,26,140)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";b += (_.v(_.f("power",c,p,0)));b += " (";if(_.s(_.f("user",c,p,1),c,p,0,51,59)){b += _.rs(c,p,function(c,p){ var b = "";b += (_.v(_.f("name",c,p,0)));return b;});c.pop();}else{b += _.b; _.b = ""};b += ")  <a href=\"#\" id=\"";if(_.s(_.f("user",c,p,1),c,p,0,96,102)){b += _.rs(c,p,function(c,p){ var b = "";b += (_.v(_.f("id",c,p,0)));return b;});c.pop();}else{b += _.b; _.b = ""};b += "\" class=\"boot\">boot</a></li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</ul>";return b;;}
window.T["powers_pregame"] = new HoganTemplate();
window.T["powers_pregame"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "Powers:";b += "\n";b += "<ul>";b += "\n";if(_.s(_.f("powers",c,p,1),c,p,0,24,91)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li><a href=# class=\"";b += (_.v(_.f("select_state",c,p,0)));b += " ";b += (_.v(_.f("name",c,p,0)));b += "\">";b += (_.v(_.f("name",c,p,0)));b += "</a></li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</ul>";return b;;}
window.T["pregame"] = new HoganTemplate();
window.T["pregame"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<div id=\"main\"> pregame template placeholder </div>";b += "\n";b += "<a href=\"#\" class=\"goToLobby\">Back To Lobby</a>";b += "\n";b += "<div id=\"player-list\"></div>";b += "\n";b += "<div id=\"power-list\"></div>";b += "\n";b += "<a href=\"#\" class=\"startGame\">Start Game</a>";return b;;}
window.T["splash"] = new HoganTemplate();
window.T["splash"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "<form id=\"user-login\">";b += "\n";b += "  <input class=\"email\" placeholder=\"email\" type=\"text\" /> <br />";b += "\n";b += "  <input class=\"name\" placeholder=\"name\" type=\"text\" /> <br />";b += "\n";b += "  <!--<input class=\"password\" type=\"password\" placeholder=\"passphrase\"/> <br /> -->";b += "\n";b += "  <input id=\"logIn\" type=\"submit\" value=\"start playing\"/>";b += "\n";b += "</form>";return b;;}
window.T["user"] = new HoganTemplate();
window.T["user"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += (_.v(_.f("name",c,p,0)));b += "\n";b += "<img src=\"";b += (_.v(_.f("avatar",c,p,0)));b += "\"/>";return b;;}
window.T["users"] = new HoganTemplate();
window.T["users"].r = function(cx,p){var c = [cx];var b = "";var _ = this;b += "Other Users:";b += "\n";b += "<ul>";b += "\n";if(_.s(_.f("users",c,p,1),c,p,0,28,47)){b += _.rs(c,p,function(c,p){ var b = "";b += "<li>";b += (_.v(_.f("name",c,p,0)));b += "</li>";b += "\n";return b;});c.pop();}else{b += _.b; _.b = ""};b += "</ul>";return b;;}

})();