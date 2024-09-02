const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify( token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Token Expired. Sign In Again' });

            req.userID = decoded.id;
            next();
        });
}

// Middleware to check user role
const authorizeRole = (roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};


module.exports = {
    verifyToken,
    authorizeRole
}
