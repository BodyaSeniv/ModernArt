angular.module('app')
  .controller('navmenupController', ['$scope', '$state', '$location', function ($scope, $state, $location) {

    $scope.getClass = function (path) {
      if ($location.path().substr(0, path.length) === path) {
        return 'active';
      } else {
        return '';
      }
    }

      if ($location.path() === '/pictures/current') {
        $scope.myButton = 'myButton';
      } else {
        $scope.myButton = '';
      }
  }]);
