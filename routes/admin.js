const path = require('path');
const express=require('express');
const rootDir=require('../util/util');
const adminController=require('../controllers/admin');
const router=express.Router();

router.get('/add-product',adminController.getAddProduct);

router.post('/add-product',adminController.postAddProduct);

router.get('/products');

module.exports=router;
//exports.routes=router;