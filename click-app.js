angular.module('ClickApp', ['confirm-click'])
  .config(function (ConfirmClickProvider) {
    ConfirmClickProvider.set({
      syncFn: window.confirm.bind(window)
    });
  })
  .controller('ClickController', function ($scope) {
    $scope.popAlert = function () {
      /* eslint no-alert:0 */
      alert('pop alert!');
    };
  });
