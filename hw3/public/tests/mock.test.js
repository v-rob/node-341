// Author: Vincent Robinson

const fs = require("fs");

test("test selectEvent", () => {
	let html = fs.readFileSync("public/index.html", "utf8");
	expect(html).toEqual(expect.anything());

	document.body.innerHTML = html;
	expect(document.querySelector("h1").textContent).toBe("Cheesecake Order Form");
});
