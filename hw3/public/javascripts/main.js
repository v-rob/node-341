// Author: Vincent Robinson

// Convenience functions to get document wide elements.
const id = name => document.getElementById(name);
const one = sel => document.querySelector(sel);
const all = sel => document.querySelectorAll(sel);

function getSelectedQuantity() {
	const select = id("order-quantity");
	return select.options[select.selectedIndex].text;
}

function getSelectedTopping() {
	// Search through all radio buttons in the "topping" group and find the one
	// that is checked. Return the label for that checkbox.
	for (radio of all("input[name='topping']")) {
		if (radio.checked) {
			return one(`label[for='${radio.id}']`).textContent;
		}
	}
}

function updateSummary() {
	// Hide the form and display the summary.
	id("order-form").style.display = "none";
	id("order-placed").style.display = "block";

	id("placed-quantity").textContent = getSelectedQuantity();
	id("placed-topping").textContent = getSelectedTopping();

	// Plop the notes directly into the summary.
	id("placed-notes").textContent = id("notes").value;
}

function placeOrder(e) {
	// If the notes contain "vegan", alert and stop the rest of the function.
	if (id("notes").value.indexOf("vegan") >= 0) {
		alert("Warning: Cheesecakes contain dairy. Reconsider!");
		return;
	}

	// Send this order to the database.
	$.ajax({
		url: "/neworder",
		type: "POST",

		// Send this order to the database.
		data: {
			month: "MAY",
			day: 5,
			quantity: getSelectedQuantity(),
			topping: getSelectedTopping(),
			notes: id("notes").value,
		},

		// On success, update the webpage with the order summary.
		success: (data, statusCode, xhr) => {
			updateSummary();
		},

		// On failure, just display a simple alert message.
		error: (xhr, textStatus, statusCode) => {
			alert("Could not place order");
		},
	});
}

// Handle placing the order via the "Order" button.
id("order").addEventListener("click", placeOrder);

// Given JSON that contains lists of past orders, update the order summary on
// the page.
function updateOrders(data) {
	summaryCounts = all(".summary-count");

	// First, populate our list of totals with the initial value of zero for
	// each topping.
	totalCount = {}
	summaryCounts.forEach(elem => {
		totalCount[elem.dataset.topping] = 0;
	});

	// For each order in the array of orders, add the quantity to the running
	// total for that topping.
	data.forEach(order => {
		totalCount[order.TOPPING] += order.QUANTITY;
	});

	// Display these final totals in the summary.
	summaryCounts.forEach(elem => {
		elem.textContent = totalCount[elem.dataset.topping].toString();
	});
}

// Performs a POST to the server to get the data about past orders from a
// specific month.
function fetchMonthData(month) {
	$.ajax({
		url: "/orders",
		type: "POST",
		dataType: "json",

		// Tell the server which month to fetch.
		data: {
			month: month
		},

		// On success, update the webpage with the resulting values.
		success: (data, statusCode, xhr) => {
			updateOrders(data);
		},

		// On failure, just display a simple alert message.
		error: (xhr, textStatus, statusCode) => {
			alert("Could not fetch orders list");
		},
	});
}

// Bind click listeners for all dropdown elements in the month.
all("#months-dropdown > div").forEach(item => {
	item.addEventListener("click", e => {
		const month = item.textContent;

		// On click, set the dropdown's text to the selected month.
		id("months-text").textContent = month;

		// Fetch the new data for this month.
		fetchMonthData(month.toLowerCase());
	});
});
