angular.module('controlePresenca', ['ionic', 'controlePresenca.controllers', 'controlePresenca.services', 'ionic-material', 'ionMdInput', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'auth.signin') {
        event.preventDefault();
        $state.go('auth.signin');
      }
    }
  });
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider','$httpProvider',
function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('auth', {
      url: '/auth',
      abstract: true,
      templateUrl: 'templates/auth.html'
    })
    .state('auth.signin', {
      url: '/signin',
      views: {
        'auth-signin': {
          templateUrl: 'templates/auth-signin.html',
          controller: 'SignInCtrl'
        }
      }
    })
    // .state('auth.register', {
    //   url: '/register',
    //   views: {
    //     'auth-register': {
    //       templateUrl: 'templates/auth-register.html',
    //       controller: 'RegisterCtrl'
    //     }
    //   }
    // })
    .state('controlePresenca', {
      url: '/controlePresenca',
      abstract: true,
      templateUrl: 'templates/controlePresenca.html'
    })
    .state('controlePresenca.eventos', {
      url: '/eventos',
      views: {
        'controlePresenca-eventos': {
          templateUrl: 'templates/eventos.html',
          controller: 'EventosCtrl'
        }
      }
    })
    .state('controlePresenca.relatorio', {
      url: '/detalhes',
      views: {
        'controlePresenca-detalhes': {
          templateUrl: 'templates/detalhes-evento.html',
          controller: 'DetalhesEventoCtrl'
        }
      }
    })
    .state('controlePresenca.periodos', {
      url: '/periodos',
      views: {
        'controlePresenca-periodos': {
          templateUrl: 'templates/periodos-eventos.html',
          controller: 'PeriodosCtrl'
        }
      }
    })
    .state('controlePresenca.novoEvento', {
      url: '/eventos/novo',
      views: {
        'controlePresenca-novoEvento': {
          templateUrl: 'templates/evento-criar.html',
          controller: 'EventosCtrl'
        }
      }
    })
    .state('controlePresenca.novoPeriodo', {
      url: '/eventos/periodos',
      views: {
        'controlePresenca-novoPeriodo': {
          templateUrl: 'templates/periodo-criar.html',
          controller: 'PeriodosCtrl'
        }
      }
    })
    .state('controlePresenca.lancarPresenca', {
      url: '/presenca',
      views: {
        'controlePresenca-presenca': {
          templateUrl: 'templates/ler.html',
          controller: 'LerPresencaCtrl'
        }
      }
    })
    .state('controlePresenca.removerEvento', {
      url: '/remover/evento',
      views: {
        'controlePresenca-removerEvento': {
          templateUrl: 'templates/remover-evento.html',
          controller: 'EventosCtrl'
        }
      }
    })
    .state('controlePresenca.removerPeriodo', {
      url: '/remover/periodo',
      views: {
        'controlePresenca-removerPeriodo': {
          templateUrl: 'templates/remover-periodo.html',
          controller: 'PeriodosCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/auth/signin');

  $httpProvider.defaults.headers.common["X-Requested-With"] = undefined;

}]);
