const User = require('./user')
const jwt = require('jsonwebtoken')
const config = require('../../config/auth')

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        
        // Create new user
        const user = new User({
            name,
            email,
            password
        })
        
        await user.save()
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: '7d'
        })
        
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message })
    }
}

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        // Check for hardcoded admin credentials, just keep it for testing purposes
        // In production, you should remove this and use a proper admin management system
        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';
        
        if (email === adminEmail && password === adminPassword) {
            // Generate JWT token for admin
            const adminId = 'admin-user-id';
            const token = jwt.sign({ id: adminId }, config.secret, {
                expiresIn: '7d'
            });
            
            return res.json({
                token,
                user: {
                    id: adminId,
                    name: 'Administrator',
                    email: adminEmail,
                    isAdmin: true
                }
            });
        }
        
        // Regular user login flow
        // Find user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        
        // Check password
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: '7d'
        })
        
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message })
    }
}

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message })
    }
}
