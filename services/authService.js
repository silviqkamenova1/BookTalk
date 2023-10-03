const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

//exports.findByUsername = (username) => User.findOne({ username });

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (email, username, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch')
    }

    const existingUser = await User.findOne({email});

    // const existingUser = await User.findOne({
    //     $or: [
    //         {email},
    //         {username}
    //     ]})
    if (existingUser) {
        throw new Error('User exists');
    }

    // if(password.length < 4) {
    //     throw new Error('Password too short')
    // }

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({email, username, password: hashedPassword });
    return this.login(username, password)
};

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password');
    };

    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = await jwt.sign(payload, SECRET);

    return token;
}


