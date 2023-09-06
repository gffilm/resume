
class RequestPromptService {

	constructor() {}

	getConversation(conversation, senderOnly = false, limit) {
		let string = '';
		if (!conversation.length) {
			return '';
		}

		// Get last x entries
	    if (limit && conversation.length > limit) {
	    	conversation = conversation.slice(limit);
	    }

		conversation.forEach((message) => {
			if (!message.sender && senderOnly) {
				return;
			}
			string += `${message.name}: ${message.reply}\n`;
		})
		string = string.replace(/\n\s*$/, "");

		return string;
	}

	getChat(scenario, conversation) {
		let prompt = '',
			convoString	= this.getConversation(conversation, false, 20);

		prompt += `INSTRUCTIONS:\n${scenario.instructions.gptStartInstructions}\n\n`;
		prompt += `SITUATION:\n${scenario.gptChatSituation}\n\n`;
		prompt += `ABOUT ${scenario.employee.name.toUpperCase()}:\n`;
		prompt += `${scenario.employee.about}`;
		prompt +=  `${scenario.employee.traits}\n\n`;
		prompt += `CONVERSATION:###\n${convoString}\n###\n\n`;
		prompt += `${scenario.instructions.gptEndInstructions}`;
		return prompt;
	}

	getFeedback(scenario, conversation, index = 0) {
		let prompt = '',
			convoString	= this.getConversation(conversation, true),
			goal = scenario.goals[index].gpt;

		prompt += `INSTRUCTIONS:\n${scenario.instructions.gptFeedbackStartInstructions}\n\n`;
		prompt += `SITUATION:\n${scenario.gptFeedbackSituation}\n\n`;
		prompt += `CONVERSATION:\###n${convoString}\n###\n`;
		prompt += `GOAL:\n${goal}\n\n\n`;
		prompt += `${scenario.instructions.gptFeedbackEndInstructions}`;
		return prompt;
	}
}


export default RequestPromptService;
