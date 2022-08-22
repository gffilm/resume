class Flashcards {

  cards = {};
  card = null;
  index = 0;
  lastIndex = 0;
  history = [];
  total = 0;
  randomize = false;

  constructor(cards) {
    this.cards = cards;
    this.total = this.cards.length;
    this.setCard();
    this.render();
  }


  render() {
    let el = document.getElementById('card_text');
    el.innerHTML = this.card.text;
    el = document.getElementById('next_card');
    el.disabled = !this.hasNext();
    el = document.getElementById('previous_card');
    el.disabled = !this.history.length;
  }

  hasPrevious() {
      let el = document.getElementById('next_card');
      el.disabled = !this.hasNext();
  }

  getText() {
    return this.card.text;
  }

  setRandom() {
    this.randomize = true;
  }

  setIndex(i) {
     if (i  > 80) {
      console.error('Too many tries');
      return;
    }

    i++;
    this.lastIndex = this.index;
    if (this.randomize) {
      this.index = Math.floor(Math.random() * (this.total));
    } else {
      this.index++;
    }
    if (this.index === this.lastIndex) {
      this.setIndex(i);
      return;
    }

    let card = this.cards[this.index];
    if (!card) {
      console.error('Index out of range');
    } else {
      if (card.used) {
        this.setIndex(i)
      }
    }


  }

  next() {
    this.setIndex(0);
    this.setCard();
    this.render();
    this.history.push(this.card);
  }

  previous() {
    if (this.history.length) {
      this.history.pop();
      let item = this.history[this.history.length - 1];
      this.index = item ? item.index : 0;
    }
    this.setCard();
    this.render();
  }

  setCard() {
    if (!this.hasNext()) {
      this.card = {'text': 'All Done!'};
    } else {
      this.card = this.cards[this.index];
    }
    this.card.used = true;
    this.card.index = this.index;
  }

  hasNext() {
     let hasCards = false;
    this.cards.forEach((card) => {
      if (!card.used) {
        hasCards = true;
      }
    })

    return hasCards;
  }
}