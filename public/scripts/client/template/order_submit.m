<form>
  <ul>
  <input type="submit" class="submit" value = "Submit moves"/>
  <input type="submit" class="resolve" value = "Resolve all moves"/>
  {{#units}}
    <li>
      <input name="owner" type="hidden" value="{{owner}}"/>
      {{utype}}
      <input name="utype" type="hidden" value="{{utype}}"/>
      {{province}}
      <input name="prov" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option>h</option>
       <option>m</option>
       <option>s</option>
      </select>
    </li>
  {{/units}}
  </ul>
</form>