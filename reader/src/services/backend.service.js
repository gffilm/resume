
import settings from "./../services/settings.service";

class BackendService {

	constructor() {
		this.apiUrl = settings.apiURL
	}

	async send(request, endPoint = 'completion') {
		settings.apiModel.forEach((model) => {
			settings[model.model] = model.value;
		});
	    request.settings = settings;
	    if (!request.attempts) {
	    	request.attempts = 1;
	    }
	    const url = `${this.apiUrl}/${endPoint}`;
	    console.log(`SENDING TO ${url}`);
	    console.log(`REQUEST`, request);
	    console.log(request.input);
	    const response = await fetch(url, {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json",
	        },
	        body: JSON.stringify(request),
	    });

		let jsonResponse = await response.json();

	    if (!jsonResponse || !jsonResponse.hasOwnProperty('response')) {
    	    request.attempts++;
			if (request.attempts > 3) {
				return {
					status: false,
					error: "Failed after 3 attempts",
				};
			}
	    	console.log('Invalid JSON, Trying again');
	    	return await this.send(request, endPoint);
	    } else if (!jsonResponse.status) {
	    	request.attempts++;
			if (request.attempts > 3) {
				return {
					status: false,
					error: "Failed after 3 attempts",
				};
			}
	    	console.log('False Response, Trying again');
	    	return await this.send(request, endPoint);
	    }
	    jsonResponse.request = request;
	    console.log('Received', jsonResponse);
	    return jsonResponse;
	}


	async isConnected() {
		let response = {};
	    const url = `${this.apiUrl}/connected`;
		return {status: true, 'response': 'connected'};
		try {
			console.log('Checking Connection');
		    response = await fetch(url, {
		        method: "GET",
		        headers: {
		            "Content-Type": "application/json",
		        }
		    });
		} catch (e) {
			console.log('FAILED', e);
			return {
				status: false,
				error: "Connection Failed",
			};
		}

		let jsonResponse = await response.json();

		if (!jsonResponse || !jsonResponse.hasOwnProperty('response')) {
			return {
				status: false,
				error: "Invalid JSON response",
			};
		}

		return {
			status: true,
			response: 'ok'
		};
	}


	async sendAudio(blob, request) {
		const endPoint = 'audio';
		const formData = new FormData();
		formData.append("audioFile", blob, "audio.wav");
		formData.append("request", JSON.stringify(request));
		console.log('Sending Audio');
  		const response = await fetch(`${this.apiUrl}/${endPoint}`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
	    	console.log('Response Was Not OK', response);
	        return {
	            status: false,
	            error: "HTTP error! status: " + response.status,
	        };
	    }
		let jsonResponse = await response.json();
	    if (!jsonResponse || !jsonResponse.hasOwnProperty('response')) {
	    	console.log('Invalid Response', jsonResponse);
	        return {
	            status: false,
	            error: "Invalid JSON response!",
	        };
	    }

	    console.log('Received', jsonResponse);
	    return jsonResponse;
	}

}

const backendService = new BackendService();
export default backendService;

