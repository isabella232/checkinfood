angular.module('app')
.factory('$utils', function($state, $ionicPlatform)
{
    function showProduct($result)
    {
        $id = $result.text;
        console.log($id);
        var db = window.sqlitePlugin.openDatabase({name: 'checkinfood.db', location: 'database/'}, 
        function(success)
        {
            db.executeSql("select COUNT(*) from product", [], function(res) 
            {
                console.log("POUUUUULE");
                console.log(JSON.stringify(res));
            },
            function(error)
            {
                console.log(":(")
                console.log(error.message);
            }); 
        },
        function(err)
        {
             console.log("err");
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