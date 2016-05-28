angular.module('app')
.factory('$utils', function($state, $ionicPlatform)
{
    function showProduct($result)
    {
        var id = $result.text;
        console.log(id);
        var db = window.sqlitePlugin.openDatabase({name: 'food.db', location: 'default'});
        db.executeSql("select * from product where id = " + id, [], function(res) 
        {
            console.log("POUUUUULE");
            console.log(JSON.stringify(res.rows.item(0)));
        },
        function(error)
        {
            console.log(":(")
            console.log(error.message);
        });
    }
    return {
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