

function getTimeStamp() {
	const now = new Date();
	const formattedDate = now.toLocaleString('en-US', {
		timeZone: 'UTC',
		month: '2-digit',
		day: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	});
	return formattedDate;
}

function logTime(text) {
	const time = getTimeStamp();
	console.log(`\n-------------------------------------`);
    console.log(`${text}: ${time}`);
    console.log(`-------------------------------------\n`);
}


module.exports = { logTime };
