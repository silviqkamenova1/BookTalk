const router = require('express').Router();

//const { paymentMethodsMap } = require('../constants');
const { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorutils');
//const { getPaymentDataViewData } = require('../utils/viewDataUtils')

router.get('/catalog', async (req, res) => {
    //const crypto = await cryptoService.getAll();
 
    res.render('book/catalog')//, { crypto })
});

// router.get('/search', async (req, res) => {
//     const { name, paymentMethod } = req.query;
//     const crypto = await cryptoService.search(name, paymentMethod);
//     const paymentMethods = getPaymentDataViewData(paymentMethod);

//     res.render('crypto/search', { crypto, paymentMethods, name })
// });

// router.get('/:cryptoId/details', async (req, res) => {
//     const crypto = await cryptoService.getOne(req.params.cryptoId);

//     const isOwner = crypto.owner == req.user?._id;
//     // or to transform object crypto.owner to string(toString())
//     const isBuyer = crypto.buyers?.some(id => id == req.user?._id)
//     crypto.paymentMethod = paymentMethodsMap[crypto.paymentMethod]
//     // or crypto.buyers.some(id => id == req.user?._id)
//     res.render('crypto/details', { crypto, isOwner, isBuyer})
//         //first param is the view we want to render, the second is data which we need to be visualize
// });

// router.get('/:cryptoId/buy', isAuth, async (req, res) => {
//     try{
//         await cryptoService.buy(req.user._id, req.params.cryptoId);
//     } catch(error){
//         return res.render('404')    
//     }

//     res.redirect(`/crypto/${req.params.cryptoId}/details`)
// });

// router.get('/:cryptoId/edit',isAuth, async (req, res) => {
//     const crypto = await cryptoService.getOne(req.params.cryptoId);

//     const paymentMethods = getPaymentDataViewData(crypto.paymentMethod);

//     res.render('crypto/edit', { crypto, paymentMethods })
// });

// router.post('/:cryptoId/edit', isAuth, async (req, res) => {
//     const cryptoData = req.body;
//     await cryptoService.edit(req.params.cryptoId, cryptoData);

//     res.redirect(`/crypto/${req.params.cryptoId}/details`)
// });


router.get('/create', isAuth, (req, res) => {
    res.render('book/create');
});

// router.post('/create', isAuth, async (req, res) => {
//     const cryptoData = req.body;
    
//     try {
//         await cryptoService.create(req.user._id, cryptoData);
//     } catch (error) {
//         return res.status(400).render('crypto/create', {error: getErrorMessage(error)})
//     }
    
//     res.redirect('/crypto/catalog');
// });

// router.get('/:cryptoId/delete', isAuth, async (req, res) => {

//     await cryptoService.delete(req.params.cryptoId);
//     res.render('/crypto/catalog')

// });


module.exports = router;