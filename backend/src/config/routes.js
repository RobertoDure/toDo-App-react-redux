const express = require('express')
const authMiddleware = require('../api/middlewares/auth')
const authController = require('../api/user/authController')

module.exports = function(server) {
    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // Auth Routes - Public
    router.post('/auth/register', authController.register)
    router.post('/auth/login', authController.login)
    
    // Protected Routes - Require Authentication
    router.use('/todos', authMiddleware)
    router.get('/user', authMiddleware, authController.getCurrentUser)
    
    // TODO Routes
    const todoService = require('../api/todo/todoService')
    todoService.register(router, '/todos')
}