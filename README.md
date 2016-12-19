# acss-browser
Auto-generate acss classes in your browser.  Add some new acss classes and the corresponding css will be generated.  Use it in development to allow editing directly in the browser.

## Usage

Just include this script tag somewhere on your page.

```
<script src="https://unpkg.com/acss-browser"></script>
```

## config

Define your atomizer config as `acssConfig`.  You can also define `acssNamespace`.

```
<script>
  var acssConfig = {
    'custom': {
      'primary': '#f3f3f3'
    }
  }
  var acssNamespace = '#acssRoot'
</script>
<script src="https://unpkg.com/acss-browser"></script>
```
