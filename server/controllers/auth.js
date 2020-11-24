const User = require('../models/user');
const jwt = require('jsonwebtoken');  //FOR GENERATING SIGNED TOKEN
const expressJwt = require('express-jwt'); //FOR AUTHORIZATION CHECK
const {errorHandlers} = require('../helpers/dbErrorhandlers')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const {API_KEY} = require('../keys');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key : API_KEY
    }
}))

exports.signup = (req, res) =>{
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user)=>{
        if(err){
         return res.status(400).json({err})
        }

        user.salt=undefined;
        user.hashed_password=undefined;
        res.json({user})

         transporter.sendMail({
                to:user.email,
                from:"tyagikrishna38@gmail.com",
                subject:"signup success",
                html:"<h1>welcome to instagram</h1>"
            })
    })
}

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res)=>{
    res.clearCookie('t');
    req.logout();
    res.json({message: "signout success"})
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty:'auth'
});

exports.isAuth = (req, res, next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!user){
    return res.status(403).json({error:'Access denied'})
    }
    next();
}

exports.isAdmin =(req, res, next)=>{
    if(req.profile.role ===1){
        next()
    }
    else{
    return res.status(403).json({error:"Admin resource only!. Access denied"});
    }
}
exports.isAOW =(req, res, next)=>{
    if(req.profile.role ===1 || req.profile.role ===2 ){
      next();
    }else{
        return res.status(403).json({error:"worker or Admin resource only!. Access denied"});
    }
    
}
exports.isWorker =(req, res, next)=>{
    if(req.profile.role ===2 ){
        next();
    }else{
        return res.status(403).json({error:"Admin resource only!. Access denied"});
    }
   
}

exports.resetPassword = (req, res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"tyagikrishna38@gmail.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"Reset Link Send, check your email. Request again if not got the link in 5 minutes"})
            })

        })
    })
}
// ${EMAIL}/reset/${token}

exports.NewPassword = (req, res)=>{
    const newPassword = req.body.password;
    const sentToken = req.body.token;

    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            console.log('error in updating')
            return res.status(422).json({error:"Try again session expired"})
        }
        // bcrypt.hash(newPassword,12).then(hashedpassword=>{
        //    user.password = hashedpassword
        //    user.resetToken = undefined
        //    user.expireToken = undefined
        //    user.save().then((saveduser)=>{
        //        res.json({message:"password updated success"})
        //    })
        // })
        // user.encryptPassword(newPassword).then(hashedPassword=>{
        //     user.hashed_password = hashedPassword;
        //     user.resetToken = undefined
        //     user.expireToken = undefined
        //     user.save().then(savedUser=>{
        //         console.log("password updated")
        //         res.json({message: "Password Updated successfully"})
        //     })
        // })

        user.password= newPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then(saveduser=>{
            res.json({message: "Password updated successfully."})
        })
    }).catch(err=>{
        console.log(err)
    })
}