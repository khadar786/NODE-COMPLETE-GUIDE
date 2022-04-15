const Product=require('../models/product');

exports.getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/product-list',
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

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{
        pageTitle:'Checkout',
        path:'/checkout'
    });
}