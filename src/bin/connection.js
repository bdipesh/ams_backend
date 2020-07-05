import mongoose from 'mongoose'
import options from '../config'
mongoose.connect(options.url, options.optionsForDatabase)
    .then(()=> {
        console.log("Successfully connected to database.")
    })
    .catch(()=> {
        console.log("Sorry")
    })

export default mongoose;