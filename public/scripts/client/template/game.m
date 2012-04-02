{{#game}}
<a href='#' class='game-link'>
  <div class="info {{user_power}}">
    <div class="turn">{{name}}</div>
    <div class="status">Awaiting Orders</div>
    <div class="message">4 Hours Remaining</div>
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