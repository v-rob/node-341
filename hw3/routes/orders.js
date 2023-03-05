// Author: Vincent Robinson

var express = require("express");
var dbms = require("./dbms_promise.js");
var router = express.Router();

router.post("/", async function(req, res, next) {
	// We DEFINITELY should not construct the query on the client side since
	// any old Joe could send a potentially malicious query.
	const month = req.body.month;
	const data = await dbms.dbquery("SELECT * FROM ORDERS WHERE MONTH='" + month + "';");

	res.json(data);
});

module.exports = router;
