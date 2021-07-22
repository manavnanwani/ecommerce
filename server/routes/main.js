const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
// Getting Module
const Products_Model = require('../models/Products');
const Cart_Model = require('../models/Cart');
const Wishlist_Model = require('../models/Wishlist');
const ProductDescription_Model = require('../models/ProductsDescription');
const Comments_Model = require('../models/Comments');
// TEST
// @GET TEST
// GET 
router.get('/test', (req, res) => {
    res.send("Working");
});

// Database CRUD Operations
// @GET Request the product lists
// GET 
router.get('/products', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @GET Request the product lists
// GET 
router.get('/productsfilters/:category', (req, res) => {
    const { category } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({ category })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to GET the Item
// GET 
router.get('/getitemdetails/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Products_Model.findOne({ '_id': id }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to add item in cart
// POST 
router.post('/additemtocart', (req, res) => {
    const { productId, userId, product } = req.body;
    Cart_Model.countDocuments({ 'productId': productId, 'userId': userId })
    .then((count) => {
        if (count === 0) {
            const newCartItem = new Cart_Model({
                productId,
                userId,
                product
            });
            newCartItem.save()
                .then(() => {
                    res.status(200).json('Added')
                })
                .catch(err => res.status(500).json(`Server Error is ${err}`))
        } else {
            res.status(201).json('Added')
        }
    })
    .catch(err => res.status(500).json('Server Error'))
});


// Database CRUD Operations
// @POST Request to GET the Item
// GET 
router.get('/findallthecartitems/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.find({ 'userId': userId }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @GET Request to DELETE the Compare List Cart Item
// GET 
router.get('/removeitemtocart/:documentId', (req, res) => {
    const { documentId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.findOneAndDelete({ '_id': documentId })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to add item in cart
// POST 
router.post('/addtowishlistitemcart', (req, res) => {
    const { productId, userId, product } = req.body;
    Wishlist_Model.countDocuments({ 'productId': productId, 'userId': userId })
    .then((count) => {
        if (count === 0) {
            const newWishListItem = new Wishlist_Model({
                productId,
                userId,
                product
            });
            newWishListItem.save()
                .then(() => {
                    res.status(200).json('Added')
                })
                .catch(err => res.status(500).json(`Server Error is ${err}`))
        } else {
            res.status(200).json('Added')
        }
    })
    .catch(err => res.status(500).json('Server Error'))
});



// Database CRUD Operations
// @POST Request to add item in cart
// POST 
router.post('/addproductcommentstore', (req, res) => {
    const { username, profilepic, comment, productId, rating } = req.body;
    const newCommnt = new Comments_Model({
        username,
        profilepic,
        comment,
        productId,
        rating
    });
    newCommnt.save()
        .then((data) => {
            res.status(200).json('Added')
        })
        .catch(err => res.status(500).json(`Server Error is ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the Wish List Cart Item
// GET 
router.get('/getallusercomment/:productId', (req, res) => {
    const { productId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Comments_Model.find({ productId }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the Wish List Cart Item
// GET 
router.get('/findallwishlishtcartitems/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Wishlist_Model.find({ 'userId': userId }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @GET Request to DELETE the Compare List Cart Item
// GET 
router.get('/removeitemwishlisttocart/:documentId', (req, res) => {
    const { documentId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Wishlist_Model.findOneAndDelete({ '_id': documentId })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to add item in cart
// POST 
router.post('/addproduct', (req, res) => {
    const { name, url, rating, category, brand, instocks, onsale, freeshipping, freereturn, shipfrom, length, color, blackowned, producttype, origin, texture, basematerial, lacetype, preplucked, bleachedKnots, babyHairs, parting, closureSize, frontalSize, density, downloadUrl, price } = req.body;
    const newProduct = new Products_Model({
        name,
        category,
        images: downloadUrl,
        url,
        rating
    })
    newProduct.save()
        .then((pro) => {
            res.status(200).json('Product Added')
        })
        .catch(err => res.status(500).json(`Server Error is ${err}`))


    const newProductDescription = new ProductDescription_Model({
        category,
        brand,
        instocks,
        onsale,
        freeshipping,
        freereturn,
        shipfrom,
        length,
        color,
        price,
        blackowned,
        producttype,
        origin,
        texture,
        basematerial,
        lacetype,
        preplucked,
        bleachedKnots,
        babyHairs,
        parting,
        closureSize,
        frontalSize,
        density,
        product: newProduct
    });
    newProductDescription.save()
        .then(() => {
            res.status(200).json('Product Added')
        })
        .catch(err => res.status(500).json(`Server Error is ${err}`))
});

module.exports = router;