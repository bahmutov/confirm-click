angular.module('confirm-click', [])
  .provider('ConfirmClick', function () {
    var ask = window.confirm.bind(window);
    return {
      ask: function (fn) {
        ask = fn || ask;
        if (typeof ask !== 'function') {
          throw new Error('Expected confirm function, got ' + JSON.stringify(fn));
        }
      },
      $get: function () {
        return ask;
      }
    };
  })
  .directive('confirmClick', ['$window', '$q', '$parse', 'ConfirmClick', function ($window, $q, $parse, ask) {
    var counter = 1;
    return {
      restrict: 'A',
      priority: 1001,

      compile: function (elem, attributes) {
        if (attributes.ngClick) {
          attributes.prevClick = $parse(attributes.ngClick, /* interceptorFn */ null, /* expensiveChecks */ true);
          attributes.ngClick = '__confirmClick' + counter++ + '()';
        } else if (attributes.href) {
          attributes.prevClick = function () {
            $window.location.href = attributes.href;
          };
          attributes.ngClick = '__confirmClick' + counter++ + '()';
        } else if (attributes.ngHref) {
          attributes.prevClick = function (scope) {
            var url;
            try {
              url = $parse(attributes.ngHref)(scope);
            } catch (err) {
              url = attributes.ngHref;
            }
            $window.location.href = url;
          };
          attributes.ngClick = '__confirmClick' + counter++ + '()';
        }

        return {
          pre: function (scope, element, attr) {

            var question = attr.confirmClick || 'Are you sure?';

            if (attr.ngClick && attr.prevClick) {

              // strip ()
              var methodName = attr.ngClick.substr(0, attr.ngClick.length - 2);
              scope[methodName] = function (event) {
                $q.when(ask(question)).then(function (result) {
                  if (result) {
                    attr.prevClick(scope, { $event: event });
                  }
                });
              };
            }

            if (attr.href || attr.ngHref) {
              // probably regular href links
              element.on('click', function (event) {
                event.preventDefault();
                if (attr.ngClick) {
                  scope.$apply(attr.ngClick);
                }
              });
            }
          }
        };
      }
    };
  }]);
