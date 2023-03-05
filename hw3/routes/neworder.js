// Author: Vincent Robinson

var express = require("express");
var dbms = require("./dbms_promise.js");
var router = express.Router();

router.post("/", async function(req, res, next) {
	// Generate a unique ID as the current number of orders.
	const countData = await dbms.dbquery("SELECT COUNT(*) FROM ORDERS");
	const orderId = countData[0]["COUNT(*)"];

	// The NOTES column is insecure because an attacker could type something
	// like '; DROP TABLE ORDERS to delete the entire order column. In fact,
	// all columns are insecure because an attacker could make a custom HTTP
	// response. The SQL input has to be sanitized.
	await dbms.dbquery(`INSERT INTO ORDERS VALUES (${orderId}, ` +
			`'${req.body.month}', ${req.body.day}, ${req.body.quantity}, ` +
			`'${req.body.topping}', '${req.body.notes}');`);

	res.end();
});

module.exports = router;
