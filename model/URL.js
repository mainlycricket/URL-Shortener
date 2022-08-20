const mongoose = require('mongoose')

const URLSchema = mongoose.Schema({

    url: {
        type: String,
        required: [true, 'Please provide an URL'],
        trim: true
    },

    id: {
        type: Number,
        required: [true, 'Failed!']
    }

})


const model = mongoose.model('SHORT_URL', URLSchema)

module.exports = model