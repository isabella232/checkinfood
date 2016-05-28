angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) 
{
    $stateProvider
  
    .state('scanner', 
    {
        url: '/scanner',
        templateUrl: 'templates/scanner.html',
        controller: 'scannerCtrl'
    })

    .state('product', 
    {
        url: '/product',
        templateUrl: 'templates/product.html',
        controller: 'productCtrl'
    })

  $urlRouterProvider.otherwise('/scanner')
});