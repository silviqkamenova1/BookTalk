const router = require('express').Router();

//const { paymentMethodsMap } = require('../constants');
const { isAuth } = require('../middlewares/authMiddleware');
const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorutils');
//const { getPaymentDataViewData } = require('../utils/viewDataUtils')

router.get('/catalog', async (req, res) => {
    const book = await bookService.getAll();
 
    res.render('book/catalog', { book })
});

router.get('/profile', async (req, res) => {

    const user = await bookService.getUserId(req.user._id);
    let wished = await bookService.getWishedBooks(req.user._id).lean()
    //wished = wished.map(el => el.wishingList)
    console.log(wished);
    res.render('book/profile', {...user, wished})

});
router.get('/:bookId/details', async (req, res) => {
    const book = await bookService.getOne(req.params.bookId);

    const isOwner = book.owner == req.user?._id;
    const isWish = book.wishingList?.some(id => id == req.user?._id)
    //crypto.paymentMethod = paymentMethodsMap[crypto.paymentMethod]
    res.render('book/details', { ...book, isOwner, isWish})
});

router.get('/:bookId/edit',isAuth, async (req, res) => {
    const book = await bookService.getOne(req.params.bookId);

    //const paymentMethods = getPaymentDataViewData(crypto.paymentMethod);

    res.render('book/edit', { ...book})//, paymentMethods })
});

router.post('/:bookId/edit', isAuth, async (req, res) => {
    try{
        const bookData = req.body;
        await bookService.edit(req.params.bookId, bookData);
    
        res.redirect(`/book/${req.params.bookId}/details`)
    }catch(error){
        return res.status(400).render(`/book/${req.params.bookId}/edit`, {error: getErrorMessage(error)})
    }
});
router.get('/:bookId/wish', isAuth, async (req, res) => {
    try{
        await bookService.wish(req.user._id, req.params.bookId);
    } catch(error){
        return res.render('404')    
    }

    res.redirect(`/book/${req.params.bookId}/details`)
});




router.get('/create', isAuth, (req, res) => {
    res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
    const bookData = req.body;
    
    try {
        await bookService.create(req.user._id, bookData);
    } catch (error) {
        return res.status(400).render('book/create', {error: getErrorMessage(error)})
    }
    
    res.redirect('/book/catalog');
});

router.get('/:bookId/delete', isAuth, async (req, res) => {

    await bookService.delete(req.params.bookId);
    res.redirect('/book/catalog')

});


module.exports = router;