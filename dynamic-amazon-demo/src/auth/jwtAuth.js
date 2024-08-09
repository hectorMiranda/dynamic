const jwt = require('jsonwebtoken');

// Generate a JWT for a given user
function generateToken(user) {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secretKey,
    {
      expiresIn: '1h', // Token expires in 1 hour
    }
  );
  return token;
}

// Middleware to validate the JWT in incoming requests
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token provided

  const secretKey = process.env.JWT_SECRET;
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid or expired token

    req.user = user; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler
  });
}

// Example of validating a JWT without middleware
function verifyToken(token) {
  const secretKey = process.env.JWT_SECRET;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; // Token is invalid or expired
  }
}

// Log out the user by invalidating the token (client-side)
function logout(req, res) {
  res.clearCookie('token'); // Clear the JWT cookie (if using cookies)
  res.sendStatus(200); // Successfully logged out
}

module.exports = {
  generateToken,
  authenticateToken,
  verifyToken,
  logout,
};
