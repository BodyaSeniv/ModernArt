angular.module('app')
  .controller('headerController', [
    '$scope', '$state', 'currentUserService', '$location',
    function ($scope, $state, currentUserService, $location) {
    $scope.user = currentUserService.user();
    if ($scope.user == undefined) {
      $state.go('account.signin');
    }
    $scope.signout = function () {
      currentUserService.signout();
    }

    $scope.getClass = function (path) {
      $scope.locationUrl = $location.path();
      $scope.arrayUrl = $scope.locationUrl.split('/');
      $scope.path = path.split('/');
      if ($scope.path[1] === $scope.arrayUrl[1]) {
        return 'active';
      } else {
        return '';
      }
    }


  }]);
