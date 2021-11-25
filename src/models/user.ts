import mongoose from 'mongoose'

const User = new mongoose.Schema({
    firstName: { 
        type : String , 
        unique : false, 
        required : true 
    },
    lastName: { 
        type : String , 
        unique : false, 
        required : true 
    },
    username: { 
        type : String , 
        unique : true, 
        required : true 
    },
    password: { 
        type : String , 
        unique : false, 
        required : true 
    },
    favorite: [String],
});

module.exports = mongoose.models.User || mongoose.model('User', User)