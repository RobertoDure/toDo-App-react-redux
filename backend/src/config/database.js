const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Using MongoDB locally by default
// You can also use MongoDB Atlas by setting the MONGODB_URI environment variable
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks'

module.exports = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})