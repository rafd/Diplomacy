
  <ul>
  <input type="submit" class="submittwo" value = "Submit secondary moves"/>
  <input type="submit" class="resolvetwo" value = "Resolve secondary moves"/>

{{#derp}}
<form>
<br>
  {{msg1}}

  {{#retreat}}
    <li>
      <input name="name" type="hidden" value="retreat"/>
      <input name="owner" type="hidden" value="{{owner}}"/>
      {{utype}}
      <input name="utype" type="hidden" value="{{utype}}"/>
      {{province}}
      <input name="prov" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option>disband</option>
       <option>retreat</option>
      </select>
        {{#to}}
          <option>{{.}}</option>
        {{/to}}
    </li>
  {{/retreat}}


  {{msg2}}
  <input name="spawnum" type="hidden" value="{{spawnum}}"/>
  {{#spawn}}
    <li>
     <input name="name" type="hidden" value="spawn"/>
      <input name="owner" type="hidden" value="{{owner}}"/>
      {{province}}
      <input name="prov" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option>no new unit</option>
       <option>new army</option>
       {{#coast}}<option>new fleet</option>{{/coast}}
      </select>
    </li>
  {{/spawn}}

  {{msg3}}
  {{#disband}}
    <li>
      <input name="name" type="hidden" value="disband"/>
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