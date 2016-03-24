angular.module('app')
  .controller('artistcardController', [
    '$scope', '$state', 'Artist', '$http',
    function ($scope, $state, Artist, $http) {

      $scope.toJSON = function(obj) {
        return JSON.stringify(obj, null, 2);
      };

      $scope.canSave = function() {
        return $scope.InfoForm.$dirty && $scope.InfoForm.$valid;
      };

      $scope.Artist = {}

      $scope.save = function(file) {

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
          Artist.create($scope.Artist, function(data) {
            if (data) {
              $state.go('base.artist');
            }
          })
        });

      }

      $scope.handleFiles = function(files) {
        $scope.imgUrl = URL.createObjectURL(files[0]);
        $('#minipic').attr('src', $scope.imgUrl);
        $('#minipic').attr('height', '20%');
        $('#minipic').attr('width', '20%');
      }
  }]);
