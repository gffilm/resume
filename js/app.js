
class App {

  speechService = null;
  game = null;

  constructor() {
	 this.game = new Flashcards(cards);
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
    this.speechService.text = this.game.getText();
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
}

app = new App();