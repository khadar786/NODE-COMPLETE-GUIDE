const fs=require('fs');
const path=require('path');
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
    constructor(title,imageUrl,description,price){
        this.title=title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
    }

    save(){
        this.id=Math.random().toString();
        geProductsFromFile(products=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(error)=>{
                console.log(error);
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