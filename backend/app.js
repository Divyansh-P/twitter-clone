
const express=require('express');
const app=express();
const Twitter=require('./api/helpers/twitter');
const twitter= new Twitter();
const port=process.env.PORT||3000;
require('dotenv').config();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
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