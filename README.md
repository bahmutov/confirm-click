# confirm-click

> Angular directive for simple href or ng-click confirmation before proceeding

```html
<a href="http://github.com" confirm-click="Go to github?">github.com</a>
```

[Demo](http://glebbahmutov.com/confirm-click/)

## Install and use

1. `npm install confirm-click --save`
2. Include `node_modules/confirm-click/confirm-click.js` 
3. Add `confirm-click` module dependency to your app

### Confirming ng-click

Works with regular boolean- or promise-returning functions.

```html
<a ng-click="popAlert()" href="javascript:void(0)"
  confirm-click="Want to see a popup?">pop alert</a>
```

### Custom popup function

```html
<script>
// just to show 3rd party confirm, should return a boolean
function ask(question) {
  return confirm(question);
}
</script>
<a ng-href="http://github.com" 
    confirm-click="Go to github?" 
    confirm-fn="ask">github.com</a>
```

### Custom popup function for ng-click

Can return a promise, should resolve with `false` to stop the action.

```html
<script>
  function rejectAfterTimeout(question) {
    var injector = angular.element(document.body).injector();
    var $timeout = injector.get('$timeout');
    console.log('reject after timeout starts delay 1 sec');
    return $timeout(function () {
      console.log('rejectAfterTimeout is returning false');
      return false;
    }, 1000);
  }
</script>
<a ng-click="popAlert()" href="javascript:void(0)"
  confirm-click="Want to see a popup?"
  confirm-fn="rejectAfterTimeout">pop alert</a>
```

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/confirm-click/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
