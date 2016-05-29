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
        console.log('test');
        $state.go("scanner");
    }
    
    $scope.$on('$stateChangeSuccess', function(event)
    {
        $scope.productName  = $utils.getCurrentProduct() == undefined ? "" : $utils.getCurrentProduct().name;
        $scope.productGrade = $utils.getCurrentProduct() == undefined ? "Z" : $utils.getCurrentProduct().grade;
        $scope.recommendedName = $utils.getRecommendedProduct() == undefined ? "" : $utils.getRecommendedProduct().name;
        document.getElementById('jauge').src = 'images/'+$scope.productGrade+'.png';
    });
    
    //console.log("productName: " + productName);
})
 