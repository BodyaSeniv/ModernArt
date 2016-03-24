angular.module('app')
  .factory('Account', [
    '$resource', 'host',
    function ($resource, host) {
      var link = host + 'login?:action';
      return $resource(link, { action: '@action'}, {
        update: { method: 'PUT',  params: { action: 'update'  } },
        updatePassword: { method: 'PUT', params: { action: 'update-password' } },
        register: {method: 'POST', params: { action: 'register' } },
        signin: { method: 'GET', params: { action: '@action' } },
        logout: { method: 'GET', params: { action: 'logout' }}
      });
    }]);
