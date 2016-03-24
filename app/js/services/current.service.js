angular.module('app')
  .factory('Current', [
    '$resource', 'host',
    function ($resource, host) {
      var link = host + 'classes/Customer/:action';
      return $resource(link, { action: '@action'}, {
        getAll: { method: 'GET',  params: { action: ''  } },
        getOne: { method: 'GET',  params: { action: '@action'  } },
        update: { method: 'PUT',  params: { action: '@action'  } },
      });
    }]);
