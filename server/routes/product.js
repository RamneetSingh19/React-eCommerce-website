const express = require('express');
const router = express.Router();
const {userById} = require('../controllers/user')
const {create, read, productById, remove, update,list, listRelated, listCategories,listBySearch,photo,listSearch} = require('../controllers/product');
const { requireSignin, isAuth, isAOW} = require('../controllers/auth')

router.get('/product/:productId', read);
router.get('/products/search', listSearch);
router.post('/product/create/:userId',requireSignin ,isAuth, isAOW , create);
router.delete('/product/:productId/:userId', requireSignin ,isAuth, isAOW, remove)
router.put('/product/:productId/:userId', requireSignin ,isAuth, isAOW, update)
router.get('/products', list)
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);


module.exports= router;