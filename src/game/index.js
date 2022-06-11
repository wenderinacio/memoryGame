let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    animals: ['bull',
        'butterfly',
        'cat',
        'chicken',
        'crab',
        'dog',
        'fox',
        'frog',
        'seagull',
        'unicorn'],

    cards: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);
        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {

        return this.cards.filter(card => !card.flipped).length === 0;
    },

    createCardsFromAnimals: function () {

        this.cards = [];

        this.animals.forEach((animal) => {
            this.cards.push(this.createPairFromAnimal(animal));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromAnimal: function (animal) {

        return [{
            id: this.createIdWithTech(animal),
            icon: animal,
            flipped: false,
        }, {
            id: this.createIdWithTech(animal),
            icon: animal,
            flipped: false,
        }]
    },

    createIdWithTech: function (animal) {
        return animal + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

    flipCard: function(cardId, gameOverCallBack, noMatchCallBack) {
        if (this.setCard(cardId)) {
            if (this.secondCard) {
              if (this.checkMatch()) {
                this.clearCards();
                if (this.checkGameOver()) {
                  // Game Over
                  gameOverCallBack();
                }
              } else {
                setTimeout(() => {
                  // No Match
                  this.unflipCards();
                  noMatchCallBack();
                }, 1000);
              }
            }
          }
    }
}

export default game;