const Decks = require('../models/decks');

module.exports = app => {
    app.get('/decks', (req, res) => {
        Decks.lista(res);
    });
}