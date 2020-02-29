const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://admin2:Dure123456@ds155492.mlab.com:55492/tasks')