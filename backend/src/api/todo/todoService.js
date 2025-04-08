const Todo = require('./todo')

Todo.methods(['get', 'post', 'put', 'delete'])
Todo.updateOptions({new: true, runValidators: true})

// Custom middleware to handle user-specific todos and filtering
Todo.before('get', async (req, res, next) => {
    // Base query - only return todos for the current user
    const query = { user: req.userId }
    
    // Apply filters if provided
    if (req.query.done) {
        query.done = req.query.done === 'true'
    }
    
    if (req.query.priority) {
        query.priority = req.query.priority
    }
    
    if (req.query.category) {
        query.category = req.query.category
    }
    
    // Search by description
    if (req.query.search) {
        query.description = { $regex: req.query.search, $options: 'i' }
    }
    
    // Date filters
    if (req.query.dueBefore) {
        query.dueDate = { ...query.dueDate, $lte: new Date(req.query.dueBefore) }
    }
    
    if (req.query.dueAfter) {
        query.dueDate = { ...query.dueDate, $gte: new Date(req.query.dueAfter) }
    }
    
    // Set the query in the request
    req.query.where = JSON.stringify(query)
    
    // Handle sorting
    if (req.query.sort) {
        req.query.sort = req.query.sort
    } else {
        // Default sort by creation date, newest first
        req.query.sort = '-createdAt'
    }
    
    next()
})

// Add user ID to new todos
Todo.before('post', (req, res, next) => {
    req.body.user = req.userId
    next()
})

module.exports = Todo