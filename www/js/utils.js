angular.module('app')
    .factory('$utils', function($state, $ionicPlatform)
    {
        return {
            showScanner: function($scope) 
            {
                cordova.plugins.barcodeScanner.scan
                (
                     function (result)
                     {
                        $state.go("product");
                        $scope.barcode = result.text;
                     }, 
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