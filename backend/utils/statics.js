const path=require('path');
const express=require('express');

exports.setStatics=app=>{
    
app.use(express.static(path.join(__dirname,"../../frontend")));
}