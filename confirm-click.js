angular.module('confirm-click', [])
  .provider('ConfirmClick', function () {
    var config = {
      syncFn: window.confirm.bind(window),
      asyncFn: window.confirm.bind(window)
    };
    return {
      set: function (options) {
        config.syncFn = options.sync || options.syncFn || config.syncFn;
        if (typeof config.syncFn !== 'function') {
          throw new Error('Expected sync confirm function, got ' + JSON.stringify(config.syncFn));
        }

        config.asyncFn = options.async || options.asyncFn || config.asyncFn;
        if (typeof config.asyncFn !== 'function') {
          throw new Error('Expected async confirm function, got ' + JSON.stringify(config.asyncFn));
        }
      },
      $get: function () {
        return config;
      }
    };
  })
  .directive('confirmClick', ['$window', '$q', '$parse', 'ConfirmClick', function ($window, $q, $parse, config) {
    var counter = 1;
    return {
      restrict: 'A',
      priority: 1001,

      compile: function (elem, attributes) {
        if (attributes.ngClick) {
          attributes.prevClick = $parse(attributes.ngClick, /* interceptorFn */ null, /* expensiveChecks */ true);
          attributes.ngClick = '__confirmClick' + counter++ + '()';
        }

        return {
          pre: function (scope, element, attr) {

            var question = attr.confirmClick || 'Are you sure?';

            if (attr.ngClick && attr.prevClick) {

              // strip ()
              var methodName = attr.ngClick.substr(0, attr.ngClick.length - 2);
              scope[methodName] = function (event) {
                $q.when(config.asyncFn(question)).then(function (result) {
                  if (result) {
                    attr.prevClick(scope, { $event: event });
                  }
                });
              };
            } else {
              // probably regular href links
              element.on('click', function (event) {
                var answer = config.syncFn(question);
                if (!answer) {
                  event.preventDefault();
                }
              });
            }
          }
        };
      }
    };
  }]);
