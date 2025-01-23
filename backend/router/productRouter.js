const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const productSchema = require('../models/ProductSchema')
const verifyToken = require('../TokenVerification')
const cart = require('../models/addToCartSchema')





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve(__dirname, '../../frontend/public/images')
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + file.originalname
        cb(null, unique)

    }
})

const upload = multer({ storage: storage })


router.post('/addproduct', verifyToken, upload.single('image'), async (req, res) => {
    console.log(req.body, 'from add product');
    const { name, price, company, description } = req.body

    const imageName = req.file.filename

    try {
        const newProduct = new productSchema({
            productimage: imageName,
            prodctname: name,
            productprice: price,
            productcompany: company,
            productdesc: description
        })
        await newProduct.save()
        res.status(200).json('Product added successfully')

    } catch (error) {
        console.log('Error');
        res.status(500).json({ message: 'Internal server error' })

    }
})
router.get('/allproductget', verifyToken, async (req, res) => {
    try {
        const response = await productSchema.find()
        res.status(200).json(response)

    } catch (error) {
        console.log('err getting data');


        res.status(404).json('error getting data ', error)
    }
})

router.post('/addTocart', verifyToken, async (req, res) => {

    const { data, userId } = req.body

    const { productimage, prodctname, productprice, productcompany, productdesc } = data

    try {
        const newCart = new cart({ productimage, prodctname, productprice, productcompany, productdesc, UserId: userId });
        await newCart.save();

        res.status(200).json('Product added to cart successfully');

    } catch (error) {
        console.log(error);
        res.status(400).json('error adding to cart');

    }
})

router.get('/cart/:id', verifyToken, async (req, res) => {

    const userid = req.params.id

    try {
        const UserCart =await cart.find({ UserId: userid })
        res.status(200).json(UserCart);
        

    } catch (error) {
        console.log(error);
        res.status(400).json('error getiing  cart');
    }
})

module.exports = router