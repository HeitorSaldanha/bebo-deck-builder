const customExpress = require('./config/custom-express');
const connection = require('./infra/connection');

async function main(){
  try {
      // Connect to the MongoDB cluster
      await connection.connect();
      const app = customExpress();
      app.listen(3000, () => console.log('Hello World 3000'));

  } catch (e) {
      console.error(e);
  }
}

main().catch(console.error);