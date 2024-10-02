const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    console.log('Token:', token);
    // If not in cookies, check Authorization header
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }

    console.log('Token:', token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

module.exports = authMiddleware;