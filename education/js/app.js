
class App {

  speechService = null;
  game = null;

  constructor() {
	 this.game = new Flashcards(cards);
   this.analyzer = new Analyzer();
  }

  onReady() {
     this.initVoice();
  }

  initVoice() {
    let service = new SpeechSynthesisUtterance(),
    voices = speechSynthesis.getVoices();
	  service.voice = voices[6];
    service.text = '';
    this.speechService = service;
  }

  read() {
    this.initVoice();
    const text = this.game.getVoice().trim();
    this.speechService.text = text;
    if (this.game.getSelectedText()) {
      // only record selected text reads
      this.analyzer.record(text);
    }
    window.speechSynthesis.speak(this.speechService);
  }

  next() {
  	this.game.next();
  }

  previous() {
    this.game.previous();
  }

	randomize() {
		this.game.setRandom();
 	}

  analyze() {
    const records = this.analyzer.getRecords();
    this.displayWordTable(records)
    console.log('records', records)
  }

  displayWordTable(records) {
    const wordCounts = {}; // Use an object to store word counts
    const table = document.getElementById('read-word-table');
    const container = document.getElementById('read-word-body');
    container.style.display = '';
    // Count the occurrences of each word
    records.forEach((record) => {
        const words = record.trim().split(' '); // Split the record into words
        words.forEach((word) => {
            if (!wordCounts[word]) {
                wordCounts[word] = 0;
            }
            wordCounts[word]++;
        });
    });


    table.innerHTML = `
        <tbody>
            ${Object.keys(wordCounts).map((word) => `
                <tr>
                    <td>${word}</td>
                    <td>${wordCounts[word]}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
  }


}

app = new App();