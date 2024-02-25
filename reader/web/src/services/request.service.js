import RequestPromptService from "./request_prompt.service";
import RequestMessageService from "./request_message.service";
import settings from "./settings.service";

class RequestService {

	constructor() {
		if (settings.isChatModel) {
			this.requester = new RequestMessageService();
		} else {
			this.requester = new RequestPromptService();
		}
	}

	getChatRequest(scenario, conversation) {
		return {
			input: this.requester.getChat(scenario, conversation),
			manager: scenario.manager,
			employee: scenario.employee,
		};
	}


	getFeedbackRequest(scenario, conversation, index)  {
		return {
			input: this.requester.getFeedback(scenario, conversation, index),
		};
	}
}

const requestService = new RequestService();
export default requestService;

