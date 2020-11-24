const express = require('express');
const router = express.Router();
const {userById} = require('../controllers/user')
const {getAllChatrooms, createChatroom} = require("../controllers/chatroom");

const {create, categoryById, read, update, remove, list} = require('../controllers/category')
const { requireSignin, isAuth, isAdmin} = require('../controllers/auth')

router.get('/chats', requireSignin, isAuth, getAllChatrooms);
router.post("/chats", requireSignin, isAuth, isAdmin, createChatroom);


router.param('categoryId', categoryById);
router.param('userId', userById);


module.exports= router;