//const { redirect } = require('express/lib/response');
const Product=require('../models/product');
const Cart=require('../models/cart');

exports.getProducts=(req,res,next)=>{
    Product.fetchAll()
    .then(([rows,fieldData])=>{
        res.render('shop/product-list',
        {
            prods:rows,
            pageTitle:'Products',
            path:'/products',
            hasProducts:rows.length>0,
            productCss:true,
            activeShop:true
        });
    })
    .catch(err=>console.log(err));
    
};

exports.getProduct=(req,res,next)=>{
    const productId=req.params.productId;
   //console.log(productId);
    Product.findById(productId)
    .then(([product])=>{
        //console.log(product);
        res.render('shop/product-detail',{
            product:product[0],
            pageTitle:product[0].title,
            path:'/products',
        });
    })
    .catch(err=>{

    });
    
};

exports.getIndex=(req,res,next)=>{
    Product.fetchAll()
    .then(([rows,fieldData])=>{
        res.render('shop/index',
        {
            prods:rows,
            pageTitle:'Shop',
            path:'/',
            hasProducts:rows.length>0,
            productCss:true,
            activeShop:true
        });
    })
    .catch(err=>{
        console.log(err);
    });
    
    
};

exports.getCart=(req,res,next)=>{
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            const cartProducts=[];
            for (product of products) {
                const cartProductData=cart.products.find(prod=>prod.id===product.id);
                if(cartProductData){
                    cartProducts.push({productData:product,qty:cartProductData.qty});
                }
            }
            //console.log(cartProducts);
            res.render('shop/cart',{
                pageTitle:'Your Cart',
                path:'/cart',
                products:cartProducts
            });
        });
    });
    
}

exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    console.log(prodId);
    Product.findById(prodId,(product)=>{
        Cart.addProduct(prodId,product.price);
    });
    res.redirect('/cart');
}

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{
        pageTitle:'Checkout',
        path:'/checkout'
    });
}

exports.postCartDeleteProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    console.log(prodId);
    Product.findById(prodId,product=>{
        Cart.deleteProduct(prodId,product.price);
        res.redirect('/cart');
    });
};