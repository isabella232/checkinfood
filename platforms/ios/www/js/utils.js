angular.module('app')
.factory('$utils', function($state, $ionicPlatform)
{
    var currentProduct     = {};
    var recommendedProduct = {};
    
    function showProduct($result)
    {
        var id = $result.text;
        console.log("Scanned product id " +  id);
        var db = window.sqlitePlugin.openDatabase({name: 'food.db', location: 'default'});
        db.executeSql("select * from product where id = " + id, [], function(res) 
        {
            currentProduct = res.rows.item(0);
            console.log(currentProduct.id);
            
            db.executeSql("select * from product where category = '" + currentProduct.category + "' and grade < '" + currentProduct.grade + "'", [], function(res2)
            {
                recommendedProduct = res2.rows.item(0);
                console.log(recommendedProduct.id);
                $state.go("product");
            },
            function(error)
            {
                console.log("error in select :")
                console.log(error.message);
            });               
        },
        function(errorPig)
        {
            console.log("error in select :")
            console.log(errorPig.message);
        });
    }
    return {
        getCurrentProduct: function()
        {
            return currentProduct;
        },
        getRecommendedProduct: function()
        {
            return recommendedProduct;
        },
        showScanner: function($scope) 
        {
            cordova.plugins.barcodeScanner.scan
            (                     
                showProduct, 
                function (error) 
                {
                    //alert("Scanning failed: " + error);
                },
                {
                    "preferFrontCamera" : false, // iOS and Android
                    "showFlipCameraButton" : false, // iOS and Android
                    "prompt" : "Scannez votre produit", // supported on Android only
                    "formats" : "EAN_13", // default: all but PDF_417 and RSS_EXPANDED
                    "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
                }
            );
        }
    }
})