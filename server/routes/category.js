const express = require('express');
const router = express.Router();
const {userById} = require('../controllers/user')

const {create, categoryById, read, update, remove, list} = require('../controllers/category')
const { requireSignin, isAuth, isAOW} = require('../controllers/auth')

router.get('/category/:categoryId', read);
router.post('/category/create/:userId',requireSignin ,isAuth, isAOW , create);
router.put('/category/:categoryId/:userId',requireSignin ,isAuth, isAOW , update);
router.delete('/category/:categoryId/:userId',requireSignin ,isAuth, isAOW , remove);
router.get('/categories', list);


router.param('categoryId', categoryById);
router.param('userId', userById);


module.exports= router;