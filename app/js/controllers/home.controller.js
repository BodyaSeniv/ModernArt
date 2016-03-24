angular.module('app')
  .controller('homeController', [
    '$scope', '$state', 'currentUserService',
    function ($scope, $state, currentUserService) {
    $scope.user = currentUserService.user();
    // if ($scope.user == undefined) {
    //   $state.go('account.signin');
    // }
    $scope.signout = function () {
      currentUserService.signout();
    }

  }]);
