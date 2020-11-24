const express = require('express');
const passport = require('passport')
const router = express.Router();
const {userSignupValidator} = require("../validators");
const {signup, signin, signout, requireSignin, resetPassword,NewPassword } = require('../controllers/auth');


// const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemailer-sendgrid-transport')

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key : "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"
//     }
// }))

router.post('/signup',userSignupValidator ,signup);
router.post('/signin' ,signin);
router.get('/signout' ,signout);
router.post('/resetpassword', resetPassword)
router.post('/newpassword', NewPassword)

module.exports= router;