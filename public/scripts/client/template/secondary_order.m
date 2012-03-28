{{#derp}}
<form>
  <ul>
  <input type="submit" class="submit" value = "Submit secondary moves"/>
  <input type="submit" class="resolve" value = "Resolve secondary moves"/>
<br>
  {{msg1}}

  {{#retreat}}
    <li>
      <input name="owner" type="hidden" value="{{owner}}"/>
      {{utype}}
      <input name="utype" type="hidden" value="{{utype}}"/>
      {{province}}
      <input name="prov" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option>disband </option>
       <option>retreat</option>
      </select>
        {{#to}}
          <option>{{.}}</option>
        {{/to}}
    </li>
  {{/retreat}}


  {{msg2}}

  {{#spawn}}
    <li>
      <input name="owner" type="hidden" value="{{owner}}"/>
      <input name="prov" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option>no new unit</option>
       <option>new army</option>
       <option>new fleet</option>
      </select>
    </li>
  {{/spawn}}

  {{msg3}}
  {{#disband}}
    <li>
      <input name="owner" type="hidden" value="{{owner}}"/>
      {{utype}}
      <input name="utype" type="hidden" value="{{utype}}"/>
      {{province}}
      <input name="prov" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option>hold</option>
       <option>disband</option>
      </select>
    </li>
  {{/disband}}

  </ul>
</form>
{{/derp}}