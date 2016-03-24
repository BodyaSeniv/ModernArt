angular.module('app')
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.contentType = 'application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push([
      '$q', '$location', '$localStorage',
      function ($q, $location, $localStorage) {

        return {
          request: function (config) {

              config.headers['X-Parse-Application-Id'] = '2lHepl3BK8mRRQbnSoUFqpsrbsVKKNW5J7EpIiHf';
                config.headers['X-Parse-REST-API-Key'] = 'SZEF8hRaRPtXcSjfJKs3LZDPLEqvDkO59ZmqSxm0';
                  config.headers['X-Parse-Session-Token'] = ($localStorage.user != undefined) ?  $localStorage.user.sessionToken : "";

            return config;
          },
          responseError: function (response) {

            $q.reject(response);
          }
        }
    }]);
  }]);
