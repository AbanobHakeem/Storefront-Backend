import express from 'express';
import { UserStore,User } from './models/User';
const app = express();
const port = 3000;
app.get('/api/create', (req, res) => {
  const userstore=new UserStore;
  const user :User={fullname:"abanob",email:"Abanoba@mirage.com"};
  userstore.create(user)
  
 });
 app.get('/api/list', (req, res) => {
  const userstore=new UserStore;
  console.log(userstore.index())
  
 });
 app.get('**', (req, res) => {
  res.send(`this is notfounded 404 At ${req.originalUrl}`);
 });
 app.listen(port, ()=> { 
  console.log(`server started at localhost:${port}`)
 });