angular.module('ClickApp', ['confirm-click'])
  .controller('ClickController', function ($scope) {
    $scope.popAlert = function () {
      /* eslint no-alert:0 */
      alert('pop alert!');
    };
  });
