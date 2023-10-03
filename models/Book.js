const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        //minLength: 5,
        required:  [true, 'Title is required']
    },
    author: {
        type: String,
        //minLength: 10,
        required: [true, 'Author is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    bookReview: {
        type: String,
        required: [true, 'Book review is required'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
    },
    stars: {
        type: Number,
        minLength: [1, 'Stars should be at least 1'],
        maxLength: [5, 'Stars should be no longer then 5'],
        required: [true, 'Genre is required'],
    },


})
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
