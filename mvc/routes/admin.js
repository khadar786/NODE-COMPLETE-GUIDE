const path = require('path');
const express=require('express');
const rootDir=require('../util/util');
const productsController=require('../controllers/products');
const router=express.Router();

router.get('/add-product',productsController.getAddProduct);

router.post('/add-product',productsController.postAddProduct);

module.exports=router;
//exports.routes=router;