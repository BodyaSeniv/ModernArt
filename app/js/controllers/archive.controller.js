angular.module('app')
  .controller('archiveController', ['$scope', '$state', '$rootScope', '$localStorage', 'Archive', 'Archive1', function ($scope, $rootScope, $localStorage, $state, Archive, Archive1) {

    $scope.$on("UPDATE_PARENT", function(event){
        Archive.get(function (data) {
          $scope.archive = data;
        });
    });
    Archive.get(function (data) {
      $scope.archive = data;
    });

    $scope.modalShown = false;
    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
    };

    $scope.modalShown2 = false;
    $scope.modalShown1 = false;
    $scope.delete = function(res) {
      $scope.modalShown2 = !$scope.modalShown2;
      $scope.ok = function () {
        $scope.modalShown2 = false;
        $scope.id = res;
        Archive.delete({action:$scope.id}, function (data) {
          Archive.get(function (data) {
            $scope.archive = data;
          });
        });
      }
      $scope.no = function () {
          $scope.modalShown2 = false;
      }
    }

    $scope.edit = function(res) {
      $scope.modalShown1 = !$scope.modalShown1;
      $scope.id = res;

      $scope.one = Archive1.id({action:$scope.id});

    }


  }]);
