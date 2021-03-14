const https = require("https")

exports.handler = async function(event, context) {
	const url = event.body
	
	const promise = new Promise(function(resolve, reject) {
		https.get(url, function(response) {
			if (response.statusCode === 200) {
				let data = "";
				response.setEncoding("hex");
				response.on("data", function(chunk) {
					data += chunk;
				});
				response.on("end", function() {
					let result = {
						statusCode: 200,
						body: data
					}
					resolve(result)
				});
			} else {
				resolve(response.statusCode)
			}
		}).on('error', (e) => {
			reject(Error(e))
		})
	})
	
	return promise
}