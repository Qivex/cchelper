const https = require("https")

exports.handler = async (event, context) => {
	try {
		const url = new URL(event.body)
		const promise = new Promise(function(resolve, reject) {
			https.get(url, response => {
				if (response.statusCode === 200) {
					let data = ""
					response.setEncoding("hex")
					response.on("data", chunk => { data += chunk })
					response.on("end", () => { resolve({statusCode: 200, body: data}) })
				} else {
					resolve({statusCode: 404})
				}
			})
		})
		return promise
	} catch (e) {
		return {statusCode: 404}
	}
}