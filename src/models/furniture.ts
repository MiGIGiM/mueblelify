import mongoose from 'mongoose' 

const Furniture = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})

module.exports = mongoose.models.Furniture || mongoose.model('Furniture', Furniture)