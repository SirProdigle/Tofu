const test = require('ava'),
	axios = require("axios"),
	config = require("../Config")
test("Check For HTTP 200 Response",async t => {
	return axios.get("http://localhost:" + config.express.port)
		.catch(err => {t.fail(err.message)})
		.then((res) => {if (res.status === 200) t.pass(); else t.fail(res.status)})
})