const { redirect } = require('express/lib/response');
const Product=require('../models/product');

exports.getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/product-list',
        {
            prods:products,
            pageTitle:'Products',
            path:'/products',
            hasProducts:products.length>0,
            productCss:true,
            activeShop:true
        });
    });
    
};

exports.getProduct=(req,res,next)=>{
    const productId=req.params.productId;
   //console.log(productId);
    Product.findById(productId,product=>{
        res.render('shop/product-detail',{
            product:product,
            pageTitle:product.title,
            path:'/products',
        });
    });
    
};

exports.getIndex=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index',
        {
            prods:products,
            pageTitle:'Shop',
            path:'/',
            hasProducts:products.length>0,
            productCss:true,
            activeShop:true
        });
    });
    
};

exports.getCart=(req,res,next)=>{
    res.render('shop/cart',{
        pageTitle:'Your Cart',
        path:'/cart'
    });
}

exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    console.log(prodId);
    res.redirect('/cart');
}

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{
        pageTitle:'Checkout',
        path:'/checkout'
    });
}