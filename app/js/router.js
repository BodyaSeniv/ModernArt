angular.module('app')
.config([
  '$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('base', {
      abstract: true,
      url: '',
      views: {
        '@': {
          templateUrl: 'templates/shared/layout.html'
        },
        'header@base': {
          templateUrl: 'templates/shared/header.html',
          controller: 'headerController'
        }
      }
    })
    .state('base.order', {
      url: '/orders/archive',
      views: {
        'menu@base': {
          templateUrl: 'templates/shared/menu_order.html',
          controller: 'navmenuController'
        },
        'content@base': {
          templateUrl: 'templates/order.html',
          controller: 'orderController'
        }
      }
    })
    .state('base.index', {
      url: '/orders/current',
      views: {
        'menu@base': {
          templateUrl: 'templates/shared/menu_order.html',
          controller: 'navmenuController'
        },
        'content@base': {
          templateUrl: 'templates/current.html',
          controller: 'currentController'
        }
      }
    })
    .state('base.picture', {
      url: '/pictures/archive',
      views: {
        'menu@base': {
          templateUrl: 'templates/shared/menu_picture.html',
          controller: 'navmenupController'
        },
        'content@base': {
          templateUrl: 'templates/picture.html',
          controller: 'pictureController'
        }
      }
    })
    .state('base.currentpicture', {
      url: '/pictures/current',
      views: {
        'menu@base': {
          templateUrl: 'templates/shared/menu_picture.html',
          controller: 'navmenupController'
        },
        'content@base': {
          templateUrl: 'templates/currentpicture.html',
          controller: 'currentpictureController'
        }
      }
    })
    .state('base.artist', {
      url: '/artists',
      views: {
        'content@base': {
          templateUrl: 'templates/artist.html',
          controller: 'artistController'
        }
      }
    })
    .state('base.settings', {
      url: '/settings',
      views: {
        'content@base': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsController'
        }
      }
    })
    .state('card', {
      abstract: true,
      url: '',
      views: {
        '@': {
          templateUrl: 'templates/shared/layout.html'
        }
      }
    })
    .state('card.ordercard', {
      url: '/ordercard/:id',
      views: {
        'content@card': {
          templateUrl: 'templates/ordercard.html',
          controller: 'ordercardController'
        }
      }
    })
    .state('card.picturecard', {
      url: '/createpicture',
      views: {
        'content@card': {
          templateUrl: 'templates/picturecard.html',
          controller: 'picturecardController'
        }
      }
    })
    .state('card.picturecardedit', {
      url: '/picturecard/:id',
      views: {
        'content@card': {
          templateUrl: 'templates/picturecardedit.html',
          controller: 'picturecardeditController'
        }
      }
    })
    .state('card.artistcard', {
      url: '/createartist',
      views: {
        'content@card': {
          templateUrl: 'templates/artistcard.html',
          controller: 'artistcardController'
        }
      }
    })
    .state('card.artistcardedit', {
      url: '/artistcard/:id',
      views: {
        'content@card': {
          templateUrl: 'templates/artistcardedit.html',
          controller: 'artistcardeditController'
        }
      }
    })
    .state('account', {
      abstract: true,
      url: '/account',
      views: {
        '@': {
          templateUrl: 'templates/anonymous.html'
        },
      }
    })
    .state('account.signin', {
      url: '/signin',
      views: {
        'content@account': {
          templateUrl: 'templates/signin.html',
          controller: 'signinController',
        }
      }
    })
    .state('account.signup', {
      url: '/signup',
      views: {
        'content@account': {
          templateUrl: 'templates/signup.html',
          controller: 'signupController'
        }
      }
    });
    $urlRouterProvider.otherwise('/account/signin');
  }]);
