const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')

const userRouter = require('./router/user.router')
const adminRouter = require('./router/admin.router')
const productRouter = require('./router/productRouter')
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('mongodb connected');
    }).catch((err) => {
        console.log(err,);
    })
    
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/product', productRouter)



app.listen(5000, () => {
    console.log('Server is running on port 5000');
})