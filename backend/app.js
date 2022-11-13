
import  express  from 'express';
const app=express();
import Twitter from './api/helpers/twitter.js';
const twitter= new Twitter();
const port=process.env.PORT||3000;
import {config} from 'dotenv';
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})
app.get('/',(req,res)=>{
    res.send("hello to twitter api");
})
app.get('/tweets',(req,res)=>{
    const query=req.query.query;
    const count=req.query.count;
    const token=req.query.next_token;
    twitter.get(query,count,token).then(response=>{
       res.status(200).send(response.data);
        }).catch(error=>{
        res.status(400).send(error);
         })
})

app.listen(port,()=>console.log(`Twitter API listening on ${port}!`))