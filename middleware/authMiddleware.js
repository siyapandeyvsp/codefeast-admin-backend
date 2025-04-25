const jwt = require('jsonwebtoken');

// Middleware to protect routes
exports.protect = (req, res, next) => {
  let token;

  // Check if the token is present in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user to the request object
      req.user = decoded;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token, respond with an error
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
