
# Token Verification with JSON Web Tokens (JWT)

This guide provides an overview of how to implement JWT token verification in your application using Node.js. The provided code includes functions to verify a JWT token, a middleware to protect routes, and a manual verification example.

## Prerequisites

- **Node.js**: Ensure that you have Node.js installed on your machine.
- **jsonwebtoken**: The `jsonwebtoken` library is used for handling JWT tokens. Install it using npm:

  ```bash
  npm install jsonwebtoken
  ```

## Environment Setup

Before you begin, make sure you have a secret key set in your environment variables. This secret key is used to sign and verify JWT tokens.

In your `.env` file, add:

```plaintext
JWT_SECRET=your_secret_key_here
```

## Code Overview

### Token Verification Function

The `verifyToken` function verifies a JWT token using the secret key from your environment variables. It returns the decoded user information if the token is valid, or an error message if it is not.

```javascript
const jwt = require('jsonwebtoken');

function verifyToken(token) {
  const secretKey = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secretKey);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}
```

### Middleware for Token Verification

The `verifyTokenMiddleware` function is a middleware that can be used in Express.js routes to protect them. It checks the authorization header for a valid token and attaches the decoded user information to the request object.

```javascript
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

  req.user = verificationResult.decoded;
  next();
}
```

### Manual Token Verification

You can also manually verify a token using the `verifyTokenManually` function. This is useful for scenarios where you need to verify a token outside of an Express.js route.

```javascript
function verifyTokenManually(token) {
  const result = verifyToken(token);

  if (result.valid) {
    console.log('Token is valid:', result.decoded);
  } else {
    console.error('Token verification failed:', result.error);
  }
  
  return result;
}
```

## Usage Example

To use the middleware in an Express.js application:

```javascript
const express = require('express');
const { verifyTokenMiddleware } = require('./path-to-your-verification-file');

const app = express();

app.get('/protected-route', verifyTokenMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Exported Functions

- `verifyToken`: Verifies a JWT token and returns the decoded user information or an error.
- `verifyTokenMiddleware`: Middleware to protect routes by verifying JWT tokens.
- `verifyTokenManually`: Manually verifies a JWT token and logs the result.

## Conclusion

This guide provides a basic setup for JWT token verification in a Node.js application. Make sure to handle tokens securely and consider implementing additional security measures based on your application's requirements.
