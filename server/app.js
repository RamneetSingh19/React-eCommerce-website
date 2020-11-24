const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator')
const {MONGOURI} = require('./keys');
const port = process.env.PORT || 8000    


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const braintreeRoutes = require('./routes/braintree');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const chatroomRoutes = require('./routes/chatroom')



mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// app.use(passport.initialize());
// app.use(passport.session())

//MIDDLEWARE


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())
app.use(cors());
//ROUTES MIDDLEWARE

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",braintreeRoutes);
app.use("/api",orderRoutes);
app.use("/api", chatroomRoutes);




mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo');
});

mongoose.connection.on('error', (err) => {
    console.log('Connection error', err);
});

const server = app.listen(port, ()=>{
  console.log(`The app is running on ${port}`);
})











