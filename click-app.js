angular.module('confirm-click', [])
  .directive('confirmClick', ['$window', '$q', function ($window, $q) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        console.log('linking ConfirmClick');
        var question = attr.confirmClick || 'Are you sure?';
        var ask = $window[attr.confirmFn] || confirm;

        element.on('click', function (event) {
          console.log('click on element');
          var answer = ask(question);
          if (!answer) {
            event.preventDefault();
          }
        });
      }
    };
  }]);

angular.module('ClickApp', ['confirm-click'])
  .controller('ClickController', function ($scope) {
    $scope.popAlert = function () {
      alert('pop alert!');
    };
  });
