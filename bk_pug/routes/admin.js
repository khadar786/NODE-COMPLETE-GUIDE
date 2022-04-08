const path = require('path');
const express=require('express');
const rootDir=require('../util/util');
const router=express.Router();

const products=[];

router.get('/add-product',(req,res,next)=>{
  //res.sendFile(path.join(rootDir,'views','add-product.html'));
  res.render('add-product',{docTitle:'Add Product'});
});

router.post('/add-product',(req,res,next)=>{
  //console.log(JSON.parse(JSON.stringify(req.body)));
  let formData=JSON.parse(JSON.stringify(req.body));
  products.push({title:formData.title});
  res.redirect('/');
});

//module.exports=router;
exports.routes=router;
exports.products=products;