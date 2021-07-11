const path=require('path');

const express=require('express');

const app=express();

app.use(express.static(path.join(__dirname,"../frontend")));

app.set("view engine","ejs");
app.set("views","../frontend/views")

app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(3000,()=>{
    console.log('Server is running on Port 3000')
})
