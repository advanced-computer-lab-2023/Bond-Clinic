// authMiddleware.js

import jwt from 'jsonwebtoken';
import config from 'your-config-file'; // Replace with the path to your config file

export const authenticateUser = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach user information to the request object
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
