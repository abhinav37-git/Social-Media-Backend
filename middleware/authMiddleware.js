const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // const token = req.headers['authorization'];
  // remove the 'Bearer ' prefix from the token
  const token = req.headers['authorization'].split(' ')[1];


  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
