const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' }); // Return error if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded // Attach userId to request object
    next(); // Proceed to next middleware/route
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' }); // Return error if token is invalid
  }
};

module.exports = authMiddleware; // Export the middleware