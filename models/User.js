const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [4,'Username should be at least 4 characters'],
        required:  [true, 'Username is required']
    },
    email: {
        type: String,
        minLength: [10,'Email should be at least 10 characters'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minLength: [3,'Password should be at least 3 characters'],
        required: [true, 'Password is required'],
    },

})
const User = mongoose.model('User', userSchema);
module.exports = User;
