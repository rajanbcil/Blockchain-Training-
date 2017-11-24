function getProductById()
{
	var productId = document.getElementById("productId").value;

	$.get("/getProductById?productId=" + productId , function(data){
		if(data == "")
		{
			$("#message").text("No Product found for this productId");
		}
		else
		{
			// var len = data.length;
			// var locationDetails = "";
			// var weightDetails = "";
			// for(var i = 0 ; i < len/2 ;++i){
			// 	locationDetails + =data[i];
			// 	locationDetails + = "\n"; 
			// }
			// for(var j = i ; j < len ;++j){
			// 	weightDetails + =data[j];
			// 	weightDetails + = "\n"; 
			// }			
				
			$("#message").text("Product Info: " + data );
			// $("#message2").html("Weight Info: " + weightDetails);

		}
	});

}

