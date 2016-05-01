// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.eventos', {
    url: '/eventos',
    views: {
      'tab-eventos': {
        templateUrl: 'templates/tab-eventos.html',
        controller: 'EventosCtrl'
      }
    }
  })
  .state('tab.eventos-detalhes', {
    url: '/eventos/:eventoId',
    views: {
      'tab-eventos': {
        templateUrl: 'templates/detalhes-evento.html',
        controller: 'DetalhesEventoCtrl'
      }
    }
  })
  .state('tab.eventos-periodo', {
    url: '/eventos/:eventoId/periodos',
    views: {
      'tab-eventos': {
        templateUrl: 'templates/periodos-evento.html',
        controller: 'PeriodosEventoCtrl'
      }
    }
  })
  .state('tab.eventos-periodo-ler', {
    url: '/eventos/:eventoId/:periodoId/ler',
    views: {
      'tab-eventos': {
        templateUrl: 'templates/ler.html',
        controller: 'LerPresencaCtrl'
      }
    }
  })

  .state('tab.presenca', {
    url: '/presenca',
    views: {
      'tab-presenca': {
        templateUrl: 'templates/tab-presenca.html',
        controller: 'PresencaCtrl'
      }
    }
  })

  .state('tab.configuracoes', {
    url: '/configuracoes',
    views: {
      'tab-configuracoes': {
        templateUrl: 'templates/tab-configuracoes.html',
        controller: 'ConfiguracoesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/eventos');

});
