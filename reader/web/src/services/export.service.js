import * as XLSX from 'xlsx';

import settings from "./../services/settings.service";

class ExportService {

	constructor() {
	}


	exportConversationFeedback(conversation, feedback) {
		let conversationData = [],
			feedbackData = [],
			input = null,
			prompt = '';

		conversation.forEach((message) => {
			input = message.request ? message.request.input : null;
			if (settings.isChatModel && input) {
				input.forEach((item) => {
					prompt += `${item.role}: ${item.content}\n`;
				});
			} else if (input) {
				prompt = input;
			}
			conversationData.push({
				name: message.name,
				emotion: message.emotion,
				reply: message.reply,
				prompt: prompt,
			});
		});

		feedback.forEach((item) => {
			feedbackData.push({
				goal: item.userGoal,
				score: item.score,
				feedback: item.feedback,
			});
		})

		this.workbook = XLSX.utils.book_new();
		this.worksheet1 = XLSX.utils.json_to_sheet(conversationData);
		this.worksheet2 = XLSX.utils.json_to_sheet(feedbackData);
	    XLSX.utils.book_append_sheet(this.workbook, this.worksheet1, 'conversation');
	    XLSX.utils.book_append_sheet(this.workbook, this.worksheet2, 'feedback');
	    XLSX.writeFile(this.workbook, 'conversation_feedback.xlsx');
	}
}

const exportService = new ExportService();
export default exportService;

