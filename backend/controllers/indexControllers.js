

module.exports.showIndex=async(req,res)=>{
    var x=req.body
    res.render("index",{
        pageTitle:'Track & Trace'
    })
}

module.exports.showProfile=async(req,res)=>{
    res.render("profile",{
        pageTitle:'Track & Trace'
    })
}

module.exports.getData=async(req,res)=>{
    res.render("index",{
        pageTitle:'Track & Trace',
        BlNumber:req.body.BlNumber
    })
}