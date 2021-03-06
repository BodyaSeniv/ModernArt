angular.module('app')
  .controller('pictureController', [
    '$scope', '$state', 'Artwork', 'Artist',
    function ($scope, $state, Artwork, Artist) {
      Artwork.getAll(function(data) {
        $scope.artworks = data.results;
        for(var i = $scope.artworks.length; i--;){
          if ($scope.artworks[i].artworkState == 1) {
            $scope.artworks[i].artworkStateText = 'Продана'
          }
          if($scope.artworks[i].artworkState == 0) {
            $scope.artworks.splice(i, 1);
          }
        }
        for (var i = 0; i < $scope.artworks.length; i++) {
          Artist.getOne({action: $scope.artworks[i].Artist.objectId}, function(data){
            $scope.artists = data;
            for (var i = 0; i < $scope.artworks.length; i++) {
              if ($scope.artworks[i].Artist.objectId == $scope.artists.objectId) {
                $scope.artworks[i].lastname = $scope.artists.lastName;
                $scope.artworks[i].firstname = $scope.artists.firstName;
              }
            }
          });
        }
      });
  }]);
