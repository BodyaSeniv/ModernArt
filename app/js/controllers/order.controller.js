angular.module('app')
.controller('orderController', [
  '$scope', '$state', 'Order', 'Artwork',
  function ($scope, $state, Current, Artwork) {
    Current.getAll(function(data) {
      $scope.currents = data.results;
      for(var i = $scope.currents.length; i--;){
        if ($scope.currents[i].purchaseState == 2) {
          $scope.currents[i].purchaseStateText = 'Отменен'
        } else if ($scope.currents[i].purchaseState == 3) {
          $scope.currents[i].purchaseStateText = 'Закрыт'
        }
        if($scope.currents[i].purchaseState == 0 || $scope.currents[i].purchaseState == 1) {
          $scope.currents.splice(i, 1);
        }
      }
      for (var i = 0; i < $scope.currents.length; i++) {
        Artwork.getOne({action: $scope.currents[i].Artwork.objectId}, function(data){
          $scope.artworks = data;
          for (var i = 0; i < $scope.currents.length; i++) {
            if ($scope.currents[i].Artwork.objectId == $scope.artworks.objectId) {
              $scope.currents[i].namePict = $scope.artworks.name;
              $scope.currents[i].price = $scope.artworks.price;
              $scope.currents[i].priceIdentifier = $scope.artworks.priceIdentifier;

            }
          }
        });
      }
    });
  }]);
