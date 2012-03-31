  {{#retreat}}
    <li>
      <input name="name" type="hidden" value="retreat"/>
      <input name="owner" type="hidden" value="{{owner}}"/>
      {{utype}}
      <input name="utype" type="hidden" value="{{utype}}"/>
      {{province}}
      <input name="prov" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option {{#d}}selected{{/d}} >disband</option>
       <option {{#r}}selected{{/r}} >retreat</option>
      </select>
      {{#r}}
      to
      <select name="to">
        {{#to}}
          <option>{{.}}</option>
        {{/to}}
        </select>
      {{/r}}
    </li>
  {{/retreat}}