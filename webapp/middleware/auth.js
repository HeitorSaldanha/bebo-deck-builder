const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) {
      return res
        .status(401)
        .json({msg: 'No authentication token, authorization denied'});
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if(!verified){
        return res
          .status(401)
          .json({msg: 'Token verification failed, authorization denied'});
      } else {
        req.user = verified.id;
        next();
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;