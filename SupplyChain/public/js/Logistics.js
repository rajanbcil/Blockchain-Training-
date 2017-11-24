
function updateProductDetails()
{
	var productId = document.getElementById("productId").value;
	var productWeight = document.getElementById("productWeight").value;

	$.get("/updateproductDetails?productId=" + productId + "&productWeight=" + productWeight + "&productLocation=" + "Logistic Partner", function(data){
		if(data == "Error")
		{
			$("#message").text("An error occured.");
		}
		else
		{
			$("#message").html("Transaction hash: " + data);
		}
	});

}



var socket = io("http://localhost:8080");

socket.on("connect", function () {
	socket.on("message", function (msg) {
		if($("#events_list").text() == "No Transaction Found")
		{
			$("#events_list").html("<li>Txn Hash: " + msg.transactionHash + "\nProduct Id: : " + msg.args.productId + "</li>");
		}
		else 
		{
			$("#events_list").prepend("<li>Txn Hash: " + msg.transactionHash + "\nProduct Id: : " + msg.args.productId + "</li>");
		}
    });
});