module.exports = {
    secret: process.env.JWT_SECRET || 'todo-app-super-secret-key',
    expiresIn: '7d'
}
