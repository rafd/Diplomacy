<ul>
{{#chatrooms}}
<li data-id="{{id}}">
{{power}}
({{#user}}{{name}}{{/user}})
[{{#online}}x{{/online}}{{^online}}o{{/online}}]
</li>
{{/chatrooms}}
</ul>