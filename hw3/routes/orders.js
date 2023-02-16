// Author: Vincent Robinson

var express = require("express");
var router = express.Router();

// An array of different hardcoded data for each month.
const monthData = {
	"jan": [
		{
			topping: "cherry",
			quantity: 2
		},
		{
			topping: "plain",
			quantity: 6
		},
		{
			topping: "chocolate",
			quantity: 3
		},
	],
	"feb": [
		{
			topping: "cherry",
			quantity: 1
		},
	],
	"mar": [
		{
			topping: "plain",
			quantity: 99
		},
	],
	"apr": [
		{
			topping: "chocolate",
			quantity: 314159
		},
	],
	"may": [
		{
			topping: "chocolate",
			quantity: 1
		},
		{
			topping: "chocolate",
			quantity: 1
		},
		{
			topping: "chocolate",
			quantity: 1
		},
		{
			topping: "chocolate",
			quantity: 1
		},
	],
	"jun": [
		{
			topping: "plain",
			quantity: 5000
		},
	],
	"jul": [],
	"aug": [
		{
			topping: "cherry",
			quantity: 35
		},
	],
	"sep": [
		{
			topping: "chocolate",
			quantity: 5000
		},
	],
	"oct": [
		{
			topping: "chocolate",
			quantity: 5000
		},
	],
	"nov": [
		{
			topping: "cherry",
			quantity: 3
		},
		{
			topping: "plain",
			quantity: 2
		},
	],
	"dec": [
		{
			topping: "plain",
			quantity: 1
		},
		{
			topping: "cherry",
			quantity: 2
		},
		{
			topping: "chocolate",
			quantity: 3
		},
	],
};

router.post("/", function(req, res, next) {
	// Return the hardcoded data for the month specified in the POST.
	res.json(monthData[req.body.month]);
});

module.exports = router;
