const jwt = require('jsonwebtoken');

// Function to verify the JWT and return the decoded user information
function verifyToken(token) {
  const secretKey = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secretKey);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Middleware to verify the token from the request header
function verifyTokenMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const verificationResult = verifyToken(token);

  if (!verificationResult.valid) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = verificationResult.decoded; // Attach decoded user info to request
  next();
}

// Example of how to use the token verification manually
function verifyTokenManually(token) {
  const result = verifyToken(token);

  if (result.valid) {
    console.log('Token is valid:', result.decoded);
  } else {
    console.error('Token verification failed:', result.error);
  }
  
  return result;
}

module.exports = {
  verifyToken,
  verifyTokenMiddleware,
  verifyTokenManually,
};
