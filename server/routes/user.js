const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userById, read, update, purchaseHistory, userList, remove,removedUserById} = require('../controllers/user')

router.get('/secret/:userId',requireSignin, isAuth ,isAdmin,(req, res)=>{
    res.json({user: req.profile})
})

router.get('/user/:userId', read); 
router.put('/user/:userId',requireSignin, update); 
router.delete('/user/:removedUserId/:userId', requireSignin ,isAdmin ,remove)
router.get('/orders/by/user/:userId',requireSignin, isAuth, purchaseHistory); 
router.get('/users',userList)
router.param('userId', userById);
router.param('removedUserId', removedUserById);



module.exports= router;