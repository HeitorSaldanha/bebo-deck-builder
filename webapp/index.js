const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, err => {
  if(err) {
    throw err;
  } else {
    console.log('MongoDB Connection Established')
  }
});

app.use('/users', require('./controllers/userController'));