<form>
  <ul>
  <input type="submit" class="submit" value = "Submit moves"/>
  {{#units}}
    <li>
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