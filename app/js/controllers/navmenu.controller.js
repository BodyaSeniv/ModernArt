angular.module('app')
  .controller('navmenuController', ['$scope', '$state', '$location', function ($scope, $state, $location) {

    $scope.getClass = function (path) {
      if ($location.path().substr(0, path.length) === path) {
        return 'active';
      } else {
        return '';
      }
    }

  }]);
