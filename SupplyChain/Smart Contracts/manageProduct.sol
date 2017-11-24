//Code file part of Blockchain Training Conducted by Blockchain Innovation Lab www.bcil.io 

pragma solidity ^0.4.0;

contract Proof
{
 struct ProductDetails
 {
 	 uint timestamp;
	 string weight;
	 string location;
 }

 mapping (string => ProductDetails) products;

 event productAddedStatus(bool status, uint timestamp, string weight, string location,string productId);

 //this is used to store the current location,weight of the product at the block timestamp
 function updateProductDetails(string productId, string location, string weight )
 {

if(products[productId].timestamp == 0)
 {


 	products[productId].timestamp = block.timestamp;
 	products[productId].weight =  strConcat(products[productId].weight,"  Product current weight is ",weight);
 	products[productId].location  = strConcat(products[productId].location,"  Product is at  ",location);

 }
 else{

 	products[productId].timestamp = block.timestamp;
 	products[productId].weight = strConcat(products[productId].weight,"  Product current weight is ",weight);
 	products[productId].location  = strConcat(products[productId].location,"  Product is at  ",location);

 }
 //we are triggering an event so that the frontend of our app can know that the product details are being updated
 productAddedStatus(true, block.timestamp, weight, location, productId);
 }


 //this is used to get product information
 function getProductDetails(string productId) returns ( string weight, string location)
 {
 	return (products[productId].weight, products[productId].location);
 }
 


//helper function
function strConcat(string _a, string _c, string _b) internal returns(string) { 
	bytes memory _ba = bytes(_a);
	bytes memory _bb = bytes(_b);
	bytes memory _bc = bytes(_c);
	string memory abc = new string(_ba.length + _bb.length + _bc.length);
	bytes memory babc = bytes(abc);
	uint k = 0;
	for (uint i = 0; i < _ba.length; i++) babc[k++] = _ba[i];
	for (i = 0; i < _bc.length; i++) babc[k++] = _bc[i];
	for (i = 0; i < _bb.length; i++) babc[k++] = _bb[i];
	return string(babc);
}
}