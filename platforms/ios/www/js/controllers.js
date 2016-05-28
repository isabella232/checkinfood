angular.module('app.controllers', [])
  
.controller('scannerCtrl', function($scope,$utils) 
{
    $scope.scan = function() 
    {
        $utils.showScanner($scope);
    }
})
   
.controller('productCtrl', function($scope,$utils) 
{
    $scope.scan = function() 
    {
        $utils.showScanner($scope);
    }
    console.log($scope.barcode);
    //document.getElementById("product-heading3").textContent = $scope.barcode;
})
 