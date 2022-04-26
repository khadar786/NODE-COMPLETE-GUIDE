const Product=require('../models/product');
exports.getAddProduct=(req,res,next)=>{
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/edit-product',
    {   pageTitle:'Add Product',
        path:'/admin/add-product',
        formCss:true,
        activeAddProduct:true,
        editing:false
    });
};

exports.postAddProduct=(req,res,next)=>{
    let formData=JSON.parse(JSON.stringify(req.body));
    const title=formData.title;
    const imageUrl=formData.imageUrl;
    const price=formData.price;
    const description=formData.description;

    const product=new Product(null,title,imageUrl,description,price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct=(req,res,next)=>{
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    const editMode=req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }

    const prodId=req.params.productId;
    Product.findById(prodId,product=>{
        if(!product){
            return res.redirect("/");
        }

        product.price=product.price.trim();
        console.log(product.price);
        res.render('admin/edit-product',
            {
                pageTitle:'Edit Product',
                path:'/admin/edit-product',
                editing:editMode,
                product:product
            }
        );
    });
    
};

exports.postEditProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    const updatedTilte=req.body.title;
    const updatedPrice=req.body.price;
    const updatedImageUrl=req.body.imageUrl;
    const updatedDesc=req.body.description;
    const updatedProduct=new Product(prodId,updatedTilte,updatedPrice,updatedImageUrl,updatedDesc);
    updatedProduct.save();
    res.redirect("/admin/products");
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