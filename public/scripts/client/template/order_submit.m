<form>
  <ul>
  <input type="submit" class="submit" value = "Submit moves"/>
  {{#units}}
    <li>
      <input name="owner" type="hidden" value="{{owner}}"/>
      {{utype}}
      <input name="utype" type="hidden" value="{{utype}}"/>
      {{province}}
      <input name="province" type="hidden" value="{{province}}"/>
      <select class="move" name="move">
       <option>h</option>
       <option>m</option>
       <option>s</option>
      </select>
    </li>
  {{/units}}
  </ul>
</form>