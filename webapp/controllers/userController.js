const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    if(!email || !password || !passwordCheck) {
      return res.status(400).json({msg: 'Not all fields have been entered.'})
    } else if (password.length < 5) {
      return res.status(400).json({msg: 'The password needs to be at least 5 characters long.'})
    } else if (password !== passwordCheck) {
      return res.status(400).json({msg: 'Enter the same password twice for verification.'})
    }

    const existingUser = await User.findOne({email: email});
    if (existingUser) {
      return res.status(400).json({msg: 'An account with this email already exists.'})
    }

    if(!displayName) {
      displayName = email;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      displayName
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).json({ error:err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password ) {
      return res.status(400).json({msg: 'Not all fields have been entered.'})
    }

    const user = await User.findOne({email: email});
    if(!user) {
      return res.status(400).json({msg: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({msg: 'Invalid credentials'})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.status(202).json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.status(204).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error:err.message });
  }
});

router.get('/tokenIsValid', async (req, res) => {
  try {
    const token = req.cookies.token;
    if(!token) {
      return res.json(false);
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if(!verified) {
        return res.json(false);
      } else {
        const user = await User.findById(verified.id);
        if(!user){
          return res.json(false);
        } else {
          return res.json(true);
        }
      }
    }
  } catch (err) {
    res.status(500).json({ error:err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id
  });
});

module.exports = router;