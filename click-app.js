angular.module('ClickApp', ['confirm-click'])
  .controller('ClickController', function ($scope) {
    $scope.popAlert = function () {
      alert('pop alert!');
    };
  });
