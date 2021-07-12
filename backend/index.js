const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(express.static(path.join(__dirname,"../frontend")));
app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine","ejs");
app.set("views","../frontend/views")

app.get("/",(req,res)=>{
    res.render("index",{
        pageTitle:'Trace & Trace'
    })
})

app.post("/sendData",(req,res)=>{ 
    console.log(req.body) 
    res.render("index",{
        BLNumber:req.body.BLNumber
    })
})

app.listen(3000,()=>{
    console.log('Server is running on Port 3000')
})
