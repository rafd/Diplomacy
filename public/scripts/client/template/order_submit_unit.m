{{#units}}
<li>
      <input name="owner" type="hidden" value="{{owner}}"/>
      {{utype}}
      <input name="utype" type="hidden" value="{{utype}}"/>
      {{province}}
      <input name="province" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option {{#move_h}}selected{{/move_h}}>h</option>
       <option {{#move_m}}selected{{/move_m}}>m</option>
       <option {{#move_s}}selected{{/move_s}}>s</option>
      </select>
      
      {{^move_h}}
      
      {{#from?}}
      <select name="from">
        {{#from}}
          <option>{{.}}</option>
        {{/from}}
      </select>
      {{/from?}}
      
      {{#to?}}
      <select name="to">
        {{#to}}
          <option>{{.}}</option>
        {{/to}}
      </select>
      {{/to?}}

      {{/move_h}}

</li>
{{/units}}