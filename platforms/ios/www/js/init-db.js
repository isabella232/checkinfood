angular.module('app')
.factory('$database', function($state, $ionicPlatform)
{  return {
        init: function() 
        {
            var db = window.sqlitePlugin.openDatabase({name: 'food.db', location: 'default'});
            
            db.transaction
            (
                function(tx) 
                {
                    tx.executeSql("CREATE TABLE `product` (`id` TEXT,`name` TEXT,`category` TEXT,`salt`	NUMERIC,`sugar`	REAL,`fat` REAL,`saturatedFattyAcids`	REAL,`additives` TEXT, `filter` INTEGER);");
                    tx.executeSql("INSERT INTO 'product' ( 'id','name','category','salt','sugar','fat','saturatedFattyAcids','additives','filter' ) VALUES ( '5000112615647','Coca cola 1.5L','soda','0','10.6','0.0','0.0','E338 E155d','0' )");
                }, 
                function(error)
                {
                    console.log('transaction error: ' + error.message);
                    db.close();
                }, 
                function() 
                {
                    console.log('transaction ok');
                    db.close();
                }
            );
        }
    }
})