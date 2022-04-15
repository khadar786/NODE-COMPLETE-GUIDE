const Product=require('../models/product');
exports.getAddProduct=(req,res,next)=>{
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/add-product',{pageTitle:'Add Product',path:'/admin/add-product',formCss:true,activeAddProduct:true});
};

exports.postAddProduct=(req,res,next)=>{
    let formData=JSON.parse(JSON.stringify(req.body));
    const title=formData.title;
    const imageUrl=formData.imageUrl;
    const price=formData.price;
    const description=formData.description;

    const product=new Product(title,imageUrl,price,description);
    product.save();
    res.redirect('/');
};

exports.getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products',
        {
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin/products',
            hasProducts:products.length>0,
            productCss:true,
            activeShop:true
        });
    });
};