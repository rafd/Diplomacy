{{#game}}
<a href='#' class='game-link'>
  <div class="info {{user_power}}">
    <div class="turn">{{turn}}</div>
    <div class="status">{{name}}</div>
    <div class="message"></div>
  </div>

  <div class="players">
  {{#game_players}}
    {{#user}}
      <div class="player-image {{power}}">
        <img src="/images/users/{{slug}}_50.jpg" title="{{name}}" />
      </div>
    {{/user}}
  {{/game_players}}
  </div>
</a>
{{/game}}