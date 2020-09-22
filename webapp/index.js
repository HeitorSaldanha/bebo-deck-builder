require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const app = express();

const csrfProtection = csrf({
  cookie: true
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

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

app.use(csrfProtection);

app.use('/users', require('./controllers/userController'));
app.get('/csrf-token', (req, res) => {
  	res.json({ csrfToken: req.csrfToken() });
});