import express from 'express';
import CategoryRoutes from './handlers/category_handdler';
import ProductRoutes from './handlers/product_handdler';
import bodyParser from 'body-parser';
import UserRoutes from './handlers/user_handdler';
import OrderRoutes from './handlers/order_handdler';

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

CategoryRoutes(app);  
ProductRoutes(app);
UserRoutes(app);
OrderRoutes(app);

 app.get('**', (req, res) => {
  res.send(`this is notfounded 404 At ${req.originalUrl}`);
 });
 app.listen(port, ()=> { 
  console.log(`server started at localhost:${port}`)
 });