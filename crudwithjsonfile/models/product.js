const fs=require('fs');
const path=require('path');

const Cart=require('./cart');

//const products=[];
const p=path.join(path.dirname(require.main.filename),'data','products.json');

const geProductsFromFile=(cb)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports=class Product{
    constructor(id,title,imageUrl,description,price){
        this.id=id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
    }

    save(){
        
        geProductsFromFile(products=>{
            if(this.id){
                const existingProductIndex=products.findIndex(prod=>prod.id===this.id);
                const updatedProducts=[...products];
                updatedProducts[existingProductIndex]=this;
                fs.writeFile(p,JSON.stringify(updatedProducts),(error)=>{
                    console.log(error);
                });
            }else{
                this.id=Math.random().toString();
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),(error)=>{
                    console.log(error);
                });
            }
            
        });
    }

    static deleteById(id){
        geProductsFromFile(products=>{
            const product=products.find(prod=>prod.id === id);
            const updatedProducts=products.filter(prod=>prod.id !== id);
            console.log(product);
            fs.writeFile(p,JSON.stringify(updatedProducts),(error)=>{
                if(!error){
                    Cart.deleteProduct(id,product.price)
                }
            });
        });
    }

    static fetchAll(cb){
        geProductsFromFile(cb);
    }

    static findById(id,cb){
        geProductsFromFile(products=>{
            const product=products.find(p=>p.id === id);
            console.log(product);
            cb(product);
        });
    }

}