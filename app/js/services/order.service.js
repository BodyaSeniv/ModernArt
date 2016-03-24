angular.module('app')
  .factory('Order', [
    '$resource', 'host',
    function ($resource, host) {
      var link = host + 'classes/Customer/:action';
      return $resource(link, { action: '@action'}, {
        getAll: { method: 'GET',  params: { action: ''  } },
        create: { method: 'POST',  params: { action: ''  } },
        getOne: { method: 'GET',  params: { action: '@action'  } },

      });
    }]);
