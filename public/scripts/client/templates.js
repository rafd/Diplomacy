(function() {
window.T = window.T || {};
window.T["message"] = new HoganTemplate();
window.T["message"].r = function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<span class='username'>";b += (_.v(_.f("username",c,p,0)));b += ": </span><span class='content'>";b += (_.v(_.f("content",c,p,0)));b += "</span>";return b;;}

})();