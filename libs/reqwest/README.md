#reqwest

A small, easy to use, open AJAX lib

###Version:
07/2012

###Size:
Normal: 11KB  
Minified: 6KB

###you can use it under the terms of:
MIT license

###the following Browser are supported:
IE6+  
Chrome 1+  
Safari 3+  
Mobile Safari 3+  
Firefox 1+  
Opera

###this is a project from:
Original: Dustin Diaz  
this fork: Simon Waldherr

###Demo:
[simon.waldherr.eu/projects/reqwest/](http://cdn.simon.waldherr.eu/projects/reqwest/)

API
---------

``` js
reqwest('path/to/html', function (resp) {
  qwery('#content').html(resp)
})
```

``` js
reqwest({
    url: 'path/to/html'
  , method: 'post'
  , data: { foo: 'bar', baz: 100 }
  , success: function (resp) {
      qwery('#content').html(resp)
    }
})
```

``` js
reqwest({
    url: 'path/to/html'
  , method: 'get'
  , data: { [ name: 'foo', value: 'bar' ], [ name: 'baz', value: 100 ] }
  , success: function (resp) {
      qwery('#content').html(resp)
    }
})
```

``` js
reqwest({
    url: 'path/to/json'
  , type: 'json'
  , method: 'post'
  , error: function (err) { }
  , success: function (resp) {
      qwery('#content').html(resp.content)
    }
})
```

``` js
reqwest({
    url: 'path/to/json'
  , type: 'json'
  , method: 'post'
  , contentType: 'application/json'
  , headers: {
      'X-My-Custom-Header': 'SomethingImportant'
    }
  , error: function (err) { }
  , success: function (resp) {
      qwery('#content').html(resp.content)
    }
})
```

``` js
reqwest({
    url: 'path/to/data.jsonp?callback=?'
  , type: 'jsonp'
  , success: function (resp) {
      qwery('#content').html(resp.content)
    }
})
```

``` js
reqwest({
    url: 'path/to/data.jsonp?foo=bar'
  , type: 'jsonp'
  , jsonpCallback: 'foo'
  , jsonpCallbackName: 'bar'
  , success: function (resp) {
      qwery('#content').html(resp.content)
    }
})
```

``` js
reqwest({
    url: 'path/to/data.jsonp?foo=bar'
  , type: 'jsonp'
  , jsonpCallback: 'foo'
  , success: function (resp) {
      qwery('#content').html(resp.content)
    }
  , complete: function (resp) {
      qwery('#hide-this').hide()
    }
})
```


**Happy Ajaxing!**
