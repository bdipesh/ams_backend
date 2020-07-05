const mongoose =  require('mongoose')
const options = require('../config')
mongoose.connect(options.url, options.optionsForDatabase)
    .then(()=> {
        console.log("Successfully connected to database.")
    })
    .catch(()=> {
        console.log("Sorry")
    })

module.exports = mongoose;