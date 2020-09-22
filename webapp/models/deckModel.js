const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  format: { type: String, required: true },
  colorIdentity: { type: String, required: true },
  cardList: { type: Array, required: true }
});

module.exports = Deck = mongoose.model('deck', deckSchema);