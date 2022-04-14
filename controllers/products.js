const Product=require('../models/product');

exports.getAddProduct=(req,res,next)=>{
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('add-product',{pageTitle:'Add Product',path:'/admin/add-product',formCss:true,activeAddProduct:true});
};

exports.postAddProduct=(req,res,next)=>{
    let formData=JSON.parse(JSON.stringify(req.body));
    const product=new Product(formData.title);
    product.save();
    res.redirect('/');
};

exports.getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop',{prods:products,pageTitle:'Shop',path:'/',hasProducts:products.length>0,productCss:true,activeShop:true});
    });
    
};