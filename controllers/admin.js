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

    const product=new Product(title,imageUrl,description,price);
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