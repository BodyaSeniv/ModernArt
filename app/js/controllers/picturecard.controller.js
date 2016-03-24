angular.module('app')
.controller('picturecardController', [
  '$scope', '$state', 'Artwork', 'Artist', '$http',
  function ($scope, $state, Artwork, Artist, $http) {
    Artist.getAll(function(data){
      $scope.artists = data.results;
    });

    $scope.toJSON = function(obj) {
      return JSON.stringify(obj, null, 2);
    };

    $scope.canSave = function() {
      return $scope.InfoForm.$dirty && $scope.InfoForm.$valid;
    };

    $scope.Artwork = {}

    $scope.save = function(file) {

      $http.post("https://api.parse.com/1/files/"+file.name, file, {
        withCredentials: false,
        headers: {
          'Content-Type': 'image/jpeg'
        },
        transformRequest: angular.identity
      }).then(function(result) {
        $scope.result = result.data;
        $scope.Artwork.imageFile = $scope.result;
        $scope.Artwork.imageFile.__type = "File";
        $scope.Artwork.Artist.className = "Artist";
        $scope.Artwork.Artist.__type = "Pointer";
        $scope.Artwork.artworkState = 0;
        $scope.Artwork.priceIdentifier = "$";
        Artwork.create($scope.Artwork, function(data) {
          if (data) {
            $state.go('base.currentpicture');
          }
        })
      });


    };

    $scope.handleFiles = function(files) {
      $scope.imgUrl = URL.createObjectURL(files[0]);
      $('#minipic').attr('src', $scope.imgUrl);
      $('#minipic').attr('height', '30%');
      $('#minipic').attr('width', '30%');
    }
  }]);
