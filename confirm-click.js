angular.module('confirm-click', [])
  .directive('confirmClick', ['$window', '$q', '$parse', function ($window, $q, $parse) {
    var name = 'confirmClick';
    return {
      restrict: 'A',
      priority: 1001,

      compile: function(elem, attr){
        if (attr.ngClick) {
          attr.prevClick = attr.ngClick;
          attr.ngClick = '__confirmClick()';
        }

        return {
          pre: function(scope, element, attr){

            var question = attr.confirmClick || 'Are you sure?';
            var ask = $window[attr.confirmFn] || confirm;

            if (attr.ngClick && attr.prevClick) {

              var fn = $parse(attr.prevClick, /* interceptorFn */ null, /* expensiveChecks */ true);

              scope.__confirmClick = function (event) {
                if (ask(question)) {
                  fn(scope, { $event:event });
                }
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
