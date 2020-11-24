const User = require("../models/user");
const {Order} = require('../models/order')
const formidable = require('formidable');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorhandlers');

exports.userById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({error:"User not found"})
        }

        req.profile = user
        next();
    })
}
exports.removedUserById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({error:"User not found"})
        }

        req.profileToDelete = user
        next();
    })
}

exports.read =(req, res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}



exports.update = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files)=>{
        
        
        let user = req.profile;
        user = _.extend(user, fields);


        user.save((err, result)=>{
            if(err){
                return res.status(400).json(err)
            }
            res.json(result);
        })
    })
}

exports.remove=(req, res)=>{
    let user = req.profileToDelete;
    user.remove((err, deletedUser)=>{
        if(err){
            return res.status(400).json({error: errorHandler(err)})
        }

        res.json({"message":"User Removed Successfully"});
    })

}

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];
    console.log(req.body)
    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });


    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {history: history}},
        {new: true},
        (error, data)=>{
            if(error){
                return req.status(500).json({error: "Could not update user purchase history"})
            }

            next();
        }
        )
}



exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

exports.userList = (req, res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    
    User.find({}, '-salt -hashed_password')
    .exec((err, users)=>{
        if(err || !users){
            res.json({"message":"users not found"});
        }
        res.json(users);
    })
}

