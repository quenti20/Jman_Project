const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try { 
    const decoded = jwt.verify(token, 'qwe2131');
    // console.log('Token decoded successfully:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}; 

module.exports = verifyToken;
