const connection = require('../infra/connection');

class Decks {
  lista(res){
    connection.db().admin().listDatabases().then(resp => {
      console.log("Databases:");
      res.status(200).json(resp);
    });
  };
}

module.exports = new Decks;