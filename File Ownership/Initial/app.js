var express = require("express");  
var app = express();  
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(8080);
console.log("Server listening at port 8080")
app.use(express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
})

 // 1) import the web3 library 

 var Web3 = require("web3");

// 2) Set up a http rpc conection at localhost:8545   

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// 3) Creating contract object and instance

var proofContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"fileHash","type":"string"}],"name":"get","outputs":[{"name":"timestamp","type":"uint256"},{"name":"owner","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"string"},{"name":"fileHash","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"owner","type":"string"},{"indexed":false,"name":"fileHash","type":"string"}],"name":"logFileAddedStatus","type":"event"}])

var proof = proofContract.at("0xf990865317bd84dec86c6b8091b9867588c96869")

app.get("/submit", function(req, res){
	var fileHash = req.query.hash;
	var owner = req.query.owner;

	
//4) Invoking set function on the smart contract using sendTransaction method 
// Write a synchronous function which will return "error" in case of error or would return the transaction hash received  

   proof.set.sendTransaction(owner,fileHash, {from : web3.eth.accounts[0]},function(error,transactionHash){
	if(!error){
		res.send(transactionHash);
	}   
	else{
		res.send("Error");
	}
   })

})

app.get("/getInfo", function(req, res){
	var fileHash = req.query.hash;

// 5) Invoking get function on the smart contract using call method
// save the result from the function in the variable named details

   var details = proof.get.call(filehash);

	res.send(details);
})

// 6) Adding an event listener 

proof.logFileAddedStatus.watch(function(error,result){

	if(!error){
		if(result.args.status == true){
			io.send(result);
		}
	}
})
