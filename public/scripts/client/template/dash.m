
{{#user}}
<div class="user">
  <img src="/images/users/{{slug}}_50.jpg" title="{{name}}" />
  {{name}}
  <span class="logout">Log Out</span>
  <div class="progress">
    <div class="bar" /></div>
  </div>
</div>
{{/user}}
<ul class="actions">
  <!--<li class="matchmaker"><a href="">Matchmaker</a></li>-->
  <li class="host" id="create-game"><a href="">Host a Game</a></li>
</ul>

<ul class="remote_players">
  {{#users}}
  <li><img src="/images/users/{{slug}}_25.jpg" title="{{name}}" /></li>
  {{/users}}
</ul>