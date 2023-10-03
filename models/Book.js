const mongoose = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [2, 'Title must be at least 2 characters'],
        required:  [true, 'Title is required']
    },
    author: {
        type: String,
        minLength: [5, 'Author must be at least 5 characters'],
        required: [true, 'Author is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            }, message: 'Image must be valid URL'
        }
    },
    bookReview: {
        type: String,
        minLength: [10, 'Book review must be at least 10 characters'],
        required: [true, 'Book review is required'],
    },
    genre: {
        type: String,
        minLength: [3, 'Genre must be at least 3 characters'],
        required: [true, 'Genre is required'],
    },
    stars: {
        type: Number,
        enum: [1,2,3,4,5],
        required: [true, 'Genre is required'],
    },
    wishingList:[{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }


})
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
