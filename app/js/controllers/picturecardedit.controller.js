angular.module('app')
.controller('picturecardeditController', [
  '$scope', '$state', 'Artwork', 'Artist', '$http', '$stateParams',
  function ($scope, $state, Artwork, Artist, $http, $stateParams) {
    Artist.getAll(function(data){
      $scope.artists = data.results;
    });

    Artwork.getOne ({action: $stateParams.id},function(result){
      $scope.Artwork = result;
    });

    $scope.toJSON = function(obj) {
      return JSON.stringify(obj, null, 2);
    };

    $scope.canSave = function() {
      return $scope.InfoForm.$dirty && $scope.InfoForm.$valid;
    };

    $scope.save = function(file) {

      if (file == undefined) {
        $scope.Artwork.Artist.className = "Artist";
        $scope.Artwork.Artist.__type = "Pointer";
        Artwork.update({action: $stateParams.id}, $scope.Artwork, function(data) {
          if (data) {
            $state.go('base.currentpicture');
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
          $scope.Artwork.imageFile = $scope.result;
          $scope.Artwork.imageFile.__type = "File";
          $scope.Artwork.Artist.className = "Artist";
          $scope.Artwork.Artist.__type = "Pointer";
          Artwork.update({action: $stateParams.id}, $scope.Artwork, function(data) {
            if (data) {
              $state.go('base.currentpicture');
            }
          })
        });
      }



    };

    $scope.delete = function() {
      $scope.status = confirm( "Вы уверены что хотите удалить картину \"" + $scope.Artwork.name + "\"?");
      if ($scope.status == true) {
        Artwork.delete({action: $stateParams.id}, function() {
          $state.go('base.currentpicture');
        })
      }
    };

    $scope.handleFiles = function(files) {
      $scope.imgUrl = URL.createObjectURL(files[0]);
      $('#minipic').attr('src', $scope.imgUrl);
    }

  }]);
