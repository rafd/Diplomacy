<form>
  <ul>
  <input type="submit" class="submit" value = "Submit moves"/>
  {{#units}}
    <li>
      {{province}}
      <input name="prov" type="hidden" value="{{province}}"/>
      <input name="move" type="text" size=3   />
      <input name="from" type="text" size=3   />
      <input name="to" type="text" size=3   />
    </li>
  {{/units}}
  </ul>
</form>