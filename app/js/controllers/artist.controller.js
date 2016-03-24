angular.module('app')
  .controller('artistController', [
    '$scope', '$state', 'Artist', 'Artwork','$http',
    function ($scope, $state, Artist, Artwork, $http) {
      function ArtistReturn(objectId) {
        return {
            method: 'GET',
            url: 'https://api.parse.com/1/classes/Artwork',
            params: {
                where: {Artist:{__type:"Pointer",className:"Artist",objectId:objectId}},
            }
        }
      }
      var items1 = $scope.items1 = [];
      var items2 = $scope.items2 = [];
      $http.get('https://api.parse.com/1/classes/Artist/').then(function(result) {
        $scope.artists = result.data.results;

          angular.forEach(result.data.results, function(item, index){
              items1[index] = item;
              items1[index].prodano = 0;
              items1[index].catalog = 0;
              items1[index].vsi = 0;

              $http(ArtistReturn(items1[index].objectId)).success(function(resp) {
                angular.forEach(resp.results, function(item, index2){
                  items2[index2] = item;
      
                  if(items1[index].objectId == items2[index2].Artist.objectId)
                  {
                    items1[index].vsi = items1[index].vsi + 1;
                    if (items2[index2].artworkState == '1') {
                      items1[index].prodano = items1[index].prodano + 1;
                    } else if(items2[index2].artworkState == '0') {
                      items1[index].catalog = items1[index].catalog + 1;
                    }
                  }
                });
              });
          });
      });
  }]);
