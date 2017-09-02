# Simple AJAX demo with fetch API

```javascript
fetch(url, config)
  // then(resp => resp.text())
  .then(resp => resp.json())
  .then(data => console.log())
  .catch(err => console.log(err));
```

