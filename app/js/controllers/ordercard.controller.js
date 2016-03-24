angular.module('app')
.controller('ordercardController', [
  '$scope', '$state', 'Current', 'Artwork', '$stateParams',
  function ($scope, $state, Current, Artwork, $stateParams) {

    $scope.canSave = function() {
      return $scope.InfoForm.$dirty && $scope.InfoForm.$valid;
    };

    Current.getOne({action: $stateParams.id}, function(data) {
      $scope.currents = data;
      $scope.currents.purchaseState = $scope.currents.purchaseState.toString();

      Artwork.getOne({action: $scope.currents.Artwork.objectId}, function(data){
        $scope.artworks = data;
        $scope.currents.price = $scope.artworks.price;
        $scope.currents.priceIdentifier = $scope.artworks.priceIdentifier;
        $scope.currents.namePict = $scope.artworks.name;
      });

    });


    $scope.save = function() {

        delete $scope.currents.priceIdentifier;
        delete $scope.currents.price;
        delete $scope.currents.namePict;

      $scope.currents.purchaseState = parseInt($scope.currents.purchaseState);

      if ($scope.currents.purchaseState == 0 || $scope.currents.purchaseState == 1 || $scope.currents.purchaseState == 3) {

        $scope.artworks.artworkState = 1;

        Current.update({action: $stateParams.id}, $scope.currents, function(data) {
          if (data) {

          }
        });

        Artwork.update({action: $scope.currents.Artwork.objectId}, $scope.artworks, function(data) {
          if (data) {

            $state.go('base.index');
          }
        });

      } else {
        $scope.artworks.artworkState = 0;

        Current.update({action: $stateParams.id}, $scope.currents);

        Artwork.update({action: $scope.currents.Artwork.objectId}, $scope.artworks, function(data) {
          if (data) {
            $state.go('base.index');
          }
        });
      }

    }


    $scope.toJSON = function(obj) {
      return JSON.stringify(obj, null, 2);
    };

  }]);
