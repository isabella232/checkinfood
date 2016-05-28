var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('product.json');

lr.on('error', function (err) {
	// 'err' contains error object
});

lr.on('line', function (line)
{
	var obj    = JSON.parse(line);
    if (obj.nutriments == undefined || obj.nutrition_grade_fr == undefined || obj.categories_tags == undefined)
        return;
        
    var id     = obj._id;
    var name   = obj.product_name;
    var grade  = obj.nutrition_grade_fr;
    var sugars = obj.nutriments.sugars;
    var fat    = obj.nutriments.fat;
    var salt   = obj.nutriments.salt;
    var sfv    = obj.nutriments['saturated-fat_value'];
    var cat    = obj.categories_tags[obj.categories_tags.length-1];
    var adds   = obj.additives_tags != undefined ? obj.additives_tags : {};
    var ings   = obj.ingredients_text != undefined ? obj.ingredients_text : {};
    var img    = "";//obj.image_front_url;
    
    //console.log(obj);
    //tx.executeSql("CREATE TABLE `product` (`id` TEXT,`name` TEXT,`grade` TEXT,`category` TEXT,`ings` TEXT,`imgurl` TEXT,`salt`	NUMERIC,`sugar`	REAL,`fat` REAL,`saturatedFattyAcids` REAL,`additives` TEXT, `filter` INTEGER);");
  
    var query = "       tx.executeSql(\"INSERT INTO 'product' ( 'id','name','category','salt','sugar','fat','saturatedFattyAcids','additives','grade','imgurl','ings') VALUES('"+id + "','" + name + "','" +  cat + "','" + salt + "','" + sugars + "','" + fat + "','" + sfv + "','";
       
    var addsStr = "";
    if (adds != undefined)
    {
        var i = 0;
        while (i != adds.length)
        {
            addsStr += adds[i].replace("'", "\'");
            i++;
            
            if (i != adds.length)
                addsStr += "|";
        }
    }
   
    
    query += addsStr + "','" + grade + "','" + img + "','" + ings + "');\");";
    console.log(query);
});

lr.on('end', function () 
{
	// All lines are read, file is closed now.
});