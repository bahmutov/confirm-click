angular.module('confirm-click', [])
  .directive('confirmClick', ['$window', '$q', '$parse', function ($window, $q, $parse) {
    var name = 'confirmClick';
    var counter = 1;
    return {
      restrict: 'A',
      priority: 1001,

      compile: function(elem, attr){
        if (attr.ngClick) {
          attr.prevClick = $parse(attr.ngClick, /* interceptorFn */ null, /* expensiveChecks */ true);;
          attr.ngClick = '__confirmClick' + counter++ + '()';
        }

        return {
          pre: function(scope, element, attr){

            var question = attr.confirmClick || 'Are you sure?';
            var ask = $window[attr.confirmFn] || confirm;

            if (attr.ngClick && attr.prevClick) {

              // strip ()
              var methodName = attr.ngClick.substr(0, attr.ngClick.length - 2);
              scope[methodName] = function (event) {
                $q.when(ask(question)).then(function (result) {
                  if (result) {
                    element.prevClick(scope, { $event:event });
                  }
                });
              };
            } else {
              // probably regular href links
              element.on('click', function (event) {
                var answer = ask(question);
                if (!answer) {
                  event.preventDefault();
                }
              });
            }
          }
        }
      }
    };
  }]);
