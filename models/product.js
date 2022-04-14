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
    constructor(t){
        this.title=t;
    }

    save(){
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
}