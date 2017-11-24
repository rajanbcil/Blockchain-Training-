var express = require("express");  
var app = express();  
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(8080);

app.use(express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
})

app.get("/index.html", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
})
app.get("/manufacturer.html", function(req, res){
	res.sendFile(__dirname + "/public/html/Manufacturer.html");
})

app.get("/logistics.html", function(req, res){
	res.sendFile(__dirname + "/public/html/Logistics.html");
})

app.get("/distributor.html", function(req, res){
	res.sendFile(__dirname + "/public/html/Distributor.html");
})

app.get("/retail.html", function(req, res){
	res.sendFile(__dirname + "/public/html/Retail.html");
})

app.get("/trackProduct.html", function(req, res){
	res.sendFile(__dirname + "/public/html/TrackProduct.html");
})

var Web3 = require("web3");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log(web3.isConnected());	


var addressofProductContract = "0x1b4441594f837f2560775267a3d3775e4c482bf6";

var manageProductContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"productId","type":"string"}],"name":"getProductDetails","outputs":[{"name":"weight","type":"string"},{"name":"location","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"productId","type":"string"},{"name":"location","type":"string"},{"name":"weight","type":"string"}],"name":"updateProductDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"weight","type":"string"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"productId","type":"string"}],"name":"productAddedStatus","type":"event"}]);
var manageProduct= manageProductContract.at(addressofProductContract);

app.get("/updateProductDetails", function(req, res){
	var productId = req.query.productId;
	var productLocation = req.query.productLocation;
	var productWeight = req.query.productWeight;
	console.log(typeof(productId));
	manageProduct.updateProductDetails.sendTransaction(productId,productLocation,productWeight, {
		from: web3.eth.accounts[0], gas:3987656 
	}, function(error, transactionHash){
		if (!error)
		{
			res.send(transactionHash);
		}
		else
		{
			console.log(error)
			res.send("Error");
		}
	})
})

app.get("/getProductById", function(req, res){
	
	var productId = req.query.productId;
	var productInfo = manageProduct.getProductDetails.call(productId);
	console.log(productInfo);
	var l = productInfo.length;
	var i = 0;
	var output ="";
			
	while(i < l)
	{
		output = output + productInfo[i] + "\n";
		i++; 
	}
	res.send( output );
})


manageProduct.productAddedStatus().watch(function(error, result){
	if(!error)
	{
		if(result.args.status == true)
		{
			io.send(result);
		}
	}
})



