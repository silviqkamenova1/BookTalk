const Book = require('../models/Book')
const User = require('../models/User');

exports.getAll = () => Book.find({}).lean();

exports.create = (ownerId, bookData) => Book.create({...bookData, owner: ownerId})
exports.getOne = (bookId) => Book.findById(bookId).lean();

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData, { runValidators: true});

exports.wish = async (userId, bookId) => {
    const book = await Book.findById(bookId);
    const image = book.image
    book.wishingList.push({userId});

    return book.save()
}

exports.getWishedBooks = (userId) => Book.find({wishingList: userId}).populate('wishingList', 'image _id')

exports.getUserId = (userId) => User.findById(userId).lean()//.populate('wishingList').lean()

// // //Crypto.findByIdAndUpdate(cryptoId, {$push: { buyers: userId}})
// // //(single query)mongo db push operator - find crypto by Id and update it when push userId in property buyers


exports.delete =  (bookId) =>  Book.findByIdAndDelete(bookId)