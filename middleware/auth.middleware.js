const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('authMiddleware - Headers:', req.headers);
    console.log('authMiddleware - Cookies:', req.cookies);

    let token = req.cookies.token;
    
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }

    console.log('authMiddleware - Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        console.log('authMiddleware - Decoded user:', decoded);
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = authMiddleware;