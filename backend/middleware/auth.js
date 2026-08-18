const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'craftconnect_secure_jwt_token_secret_key_2026_production';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided. Access denied.' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, artisanId, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid or has expired.' });
  }
};

const ADMIN_EMAIL = 'niroshamadumali37@gmail.com';

const requireAdmin = (req, res, next) => {
  if (
    !req.user || 
    req.user.role !== 'admin' || 
    !req.user.email || 
    req.user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
  ) {
    return res.status(403).json({ 
      error: 'Forbidden: Unauthorized access. Admin dashboard access is strictly restricted.' 
    });
  }
  next();
};

authMiddleware.authMiddleware = authMiddleware;
authMiddleware.requireAdmin = requireAdmin;

module.exports = authMiddleware;
