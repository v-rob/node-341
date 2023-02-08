// Author: Vincent Robinson

// Convenience functions to get document wide elements.
const id = name => document.getElementById(name);
const one = sel => document.querySelector(sel);
const all = sel => document.querySelectorAll(sel);

const placeOrder = (e) => {
	// If the notes contain "vegan", alert and stop the rest of the function.
	if (id("notes").value.indexOf("vegan") >= 0) {
		alert("Warning: Cheesecakes contain dairy. Reconsider!");
		return;
	}

	// Hide the form and display the summary.
	id("order-form").style.display = "none";
	id("order-placed").style.display = "block";

	// Set the quantity summary to the value of the relevant select box.
	const select = id("order-quantity");
	id("placed-quantity").textContent = select.options[select.selectedIndex].text;

	// Search through all radio buttons in the "topping" group and find the one
	// that is checked. Find the label for that checkbox and set it in the
	// summary.
	all("input[name='topping']").forEach(radio => {
		if (radio.checked) {
			const label = one(`label[for='${radio.id}']`);
			id("placed-topping").textContent = label.textContent;
		}
	})

	// Plop the notes directly into the summary.
	id("placed-notes").textContent = id("notes").value;
}

// Handle placing the order via the "Order" button.
id("order").addEventListener("click", placeOrder);

// Bind click listeners for all dropdown elements in the month.
all("#months-dropdown > div").forEach(item => {
	item.addEventListener("click", e => {
		// On click, set the dropdown's text to the selected item's text.
		id("months-text").textContent = item.textContent;
	});
});
