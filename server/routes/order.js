const express = require('express');
const router = express.Router();

const {userById, addOrderToUserHistory} = require('../controllers/user')
const { requireSignin, isAuth, isWorker} = require('../controllers/auth')
const { decreaseQuantity} = require('../controllers/product')
const {create,listOrders, getStatusValues,orderById, updateOrderStatus, remove} = require('../controllers/order')


router.post('/order/create/:userId', requireSignin,addOrderToUserHistory,decreaseQuantity,isAuth, create)
router.get('/order/list/:userId',requireSignin, isAuth, isWorker, listOrders)
router.get('/order/status-values/:userId',requireSignin, isAuth, isWorker, getStatusValues)
router.put('/order/:orderId/status/:userId',requireSignin, isAuth, isWorker, updateOrderStatus)
router.delete('/order/:orderId/:userId', requireSignin ,isAuth, isWorker, remove)



router.param('userId', userById);
router.param('orderId', orderById);


module.exports= router;