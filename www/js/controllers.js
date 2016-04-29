angular.module('starter.controllers', [])

.controller('EventosCtrl', function($scope, Eventos) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.eventos = Eventos.all();
  $scope.remove = function(evento) {
    Eventos.remove(evento);
  };
  $scope.detalhes = function(eventoId) {
    window.location = '#/tab/eventos/' + eventoId;
  }
})

.controller('DetalhesEventoCtrl', function($scope, $stateParams, Eventos) {
  $scope.evento = Eventos.get($stateParams.eventoId);
})

.controller('PeriodosEventoCtrl', function($scope, Periodos, $cordovaBarcodeScanner) {
  $scope.periodos = Periodos.all();

  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      alert(imageData.text);
      console.log("Barcode Format -> " + imageData.format);
      console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
      console.log("An error happened -> " + error);
    });
  };
})

.controller('ConfiguracoesCtrl', function($scope) {
  $scope.settings = {
    configurar: true
  };
})
.controller("LerPresencaCtrl", function($scope, $cordovaBarcodeScanner) {
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
});
