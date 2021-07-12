const { QueryTypes } = require('sequelize');

module.exports.showIndex=async(req,res)=>{
    res.render("index",{
        pageTitle:'Track & Trace',
        BlNumber:null
    })
}

module.exports.showProfile=async(req,res)=>{
    res.render("profile",{
        pageTitle:'Track & Trace'
    })
}

module.exports.getData=async(req,res)=>{
    // if(req.body.filterText){
    //     const result=await sequelize.query('SE')
    // }
    res.render("index",{
        pageTitle:'Track & Trace',
        BlNumber:req.body.BlNumber
    })
}