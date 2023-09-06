import RequestPromptService from "./request_prompt.service";

class RequestMessageService extends RequestPromptService {

	constructor() {
		super();
	}

	getConversation(conversation, senderOnly = false) {
		let messages = [];
		conversation.forEach((message) => {
			if (!message.error) {
				if (message.sender) {
					messages.push({role: 'user', content: `${message.reply}`});
				} else if (!senderOnly) {
					messages.push({role: 'assistant', content: `${message.reply}`});
				}
			}
		})
		return messages;
	}

	getPrompt(scenario, conversation) {
		let prompt = '';

		prompt += `INSTRUCTIONS:\n${scenario.instructions.gptStartInstructions}\n\n`;
		prompt += `SITUATION:\n${scenario.gptChatSituation}\n\n`;
		prompt += `ABOUT ${scenario.employee.name.toUpperCase()}:\n`;
		prompt += `${scenario.employee.about}\n`;
		prompt += `CHARACTER TRAITS FOR ${scenario.employee.name.toUpperCase()}:\n`;
		prompt +=  `${scenario.employee.traits}\n\n`;
		prompt += `FORMAT:\n${scenario.instructions.gptEndInstructions}`;
		return prompt;
	}

	getFeedbackPrompt(scenario, index = 0) {
		let prompt = '',
			goal = scenario.goals[index].gpt;

		prompt += `INSTRUCTIONS:\n${scenario.instructions.gptFeedbackStartInstructions}`;
		prompt += `SITUATION:\n${scenario.gptFeedbackSituation}\n\n`;
		prompt += `${scenario.instructions.gptFeedbackEndInstructions}`;

		return prompt;
	}

	getChat(scenario, conversation) {
		let prompt = this.getPrompt(scenario, conversation),
			messages = [{role: 'system', content: prompt}],
			conversationMessages = this.getConversation(conversation);

		return messages.concat(conversationMessages)
	}

	getFeedback(scenario, conversation, index) {
		let systemPrompt = this.getFeedbackPrompt(scenario, index),
			messages = [{role: 'system', content: systemPrompt}],
			conversationMessages = this.getConversation(conversation, true);

		return messages.concat(conversationMessages)
	}
}

export default RequestMessageService;
