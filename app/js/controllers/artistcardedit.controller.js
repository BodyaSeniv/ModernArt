angular.module('app')
  .controller('artistcardeditController', [
    '$scope', '$state', 'Artist', '$http', '$stateParams',
    function ($scope, $state, Artist, $http, $stateParams) {

      Artist.getOne ({action: $stateParams.id},function(result){
        $scope.Artist = result;

      });

      $scope.toJSON = function(obj) {
        return JSON.stringify(obj, null, 2);
      };

      $scope.canSave = function() {
        return $scope.InfoForm.$dirty && $scope.InfoForm.$valid;
      };

      $scope.Artist = {}

      $scope.save = function(file) {

        if (file == undefined) {
          Artist.update({action: $stateParams.id}, $scope.Artist, function(data) {
            if (data) {
              $state.go('base.artist');
            }
          })
        } else {

        $http.post("https://api.parse.com/1/files/"+file.name, file, {
          withCredentials: false,
          headers: {
            'Content-Type': 'image/jpeg'
          },
          transformRequest: angular.identity
        }).then(function(result) {
          $scope.result = result.data;
          $scope.Artist.imageFile = $scope.result;
          $scope.Artist.imageFile.__type = "File";
          Artist.update({action: $stateParams.id}, $scope.Artist, function(data) {
            if (data) {
              $state.go('base.artist');
            }
          })
        });
      }

      };

      $scope.handleFiles = function(files) {
        $scope.imgUrl = URL.createObjectURL(files[0]);
        $('#minipic').attr('src', $scope.imgUrl);
      };
  }]);
