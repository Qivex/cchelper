const http = require("http")
const https = require("https")

exports.handler = async function(event, context) {
	try {
		const url = new URL(event.body)
		const promise = new Promise(function(resolve, reject) {
			function callback(response) {
				if (response.statusCode === 200) {
					let data = ""
					response.setEncoding("hex")
					response.on("data", chunk => { data += chunk })
					response.on("end", () => { resolve({statusCode: 200, body: data}) })
				} else {
					resolve({statusCode: 404})
				}
			}
			if (url.protocol === "https:") {
				https.get(url, callback)
			} else {
				http.get(url, callback)
			}
		})
		return promise
	} catch (e) {
		return {statusCode: 404}
	}
}