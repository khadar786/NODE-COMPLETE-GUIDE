const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
//const { engine }=require('express-handlebars');

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const errorController=require('./controllers/error');
const db=require('./util/database');
const app=express();

/* app.engine('hbs',engine({
  extname: 'hbs',
  defaultLayout: 'main-layout',
  layoutsDir: 'views/layouts/'
})); */
/* db.execute("SELECT * FROM products")
.then((result)=>{
  console.log(result[0],result[1]);
}).catch((error)=>{
  console.log(error);
}); */

app.set('view engine','ejs');
//app.set('view engine','hbs');
//app.set('view engine','pug');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404Page);

app.listen(3000);