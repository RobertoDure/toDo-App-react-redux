const jwt = require('jsonwebtoken')
const config = require('../../config/auth')

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token')
    
    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, config.secret)
        
        // Add user ID to request
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' })
    }
}
