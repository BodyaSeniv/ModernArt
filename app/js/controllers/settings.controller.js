angular.module('app')
.controller('settingsController', [
  '$scope', '$state', '$localStorage', '$rootScope','$cookies', 'Reset', 'currentUserService', '$stateParams', '$http',
  function ($scope, $state, $localStorage, $rootScope,$cookies, Reset, currentUserService, $stateParams, $http) {
    $scope.pass = {}
    $scope.UserPut = {};
    $scope.savePass = function () {
        $scope.User = $localStorage.user;
        $scope.UserPut.password = $scope.pass.newPass;

        Reset.update({action: $scope.User.objectId}, $scope.UserPut, function (result) {
          if (result) {
            alert("Ваш пароль успешно изменен! Войдите еще раз, прежде чем продолжить.");
            currentUserService.signout();
          }
        });
    }

    $scope.canSave = function() {
      return $scope.InfoForm.$dirty && $scope.InfoForm.$valid;
    };

  }]);
