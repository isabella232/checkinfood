angular.module('app.controllers', [])
  
.controller('scannerCtrl', function($scope,$utils) 
{
    $scope.scan = function() 
    {
        $utils.showScanner($scope);
    }
})
   
.controller('productCtrl', function($scope,$utils, $state) 
{
    console.log("product controller");
    
    $scope.scan = function() 
    {
        $utils.showScanner($scope);
    }
    
    $scope.back = function()
    {
        $state.go("scanner");
    }
    
    $scope.$on('$stateChangeSuccess', function(event)
    {
        $scope.productName = $utils.getCurrentProduct().name; 
    });      
    
    
    //console.log("productName: " + productName);
})
 