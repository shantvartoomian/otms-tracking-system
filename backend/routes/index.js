const express=require('express');

const router=express.Router();


router.get("/",(req,res)=>{
    res.render("index",{
        pageTitle:'Trace & Trace'
    })
})



router.post("/sendData",(req,res)=>{ 
    console.log(req.body) 
    res.render("index",{
        pageTitle:'Trace & Trace',
        BLNumber:req.body.BLNumber
    })
})

module.exports=router;