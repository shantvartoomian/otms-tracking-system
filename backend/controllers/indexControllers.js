const {QueryTypes} = require('sequelize');


const sequelize=require('../utils/database');


module.exports.showIndex=async(req,res)=>{
    res.render("index",{
        pageTitle:'Track & Trace',
        result:null
    })
}

module.exports.showProfile=async(req,res)=>{
    res.render("profile",{
        pageTitle:'Track & Trace'
    })
}

module.exports.showSignIn=async(req,res)=>{
    res.render("signIn",{
        pageTitle:'Track & Trace'
    })
}

module.exports.login = (req, res) => {
    const _username = req.body.loginemail.toLowerCase();
    const _password = req.body.loginpassword;
  
    if(!_username || !_password ){
      req.flash("middlewareError" , "لطفا نام کاربری و رمز عبور خود را وارد نمایید");
      return res.redirect(req.headers.referer || "/");
    }
    data=await sequelize.query
    ('SELECT        ID, DesEn, DesFa, Email, password '
    +'FROM            TbEntity '
    +'WHERE        (RecStatus > 0) AND (Email = :Email) AND (password = :Password)',{
        replacements:{Email:_username,Password:_password},
        type:QueryTypes.SELECT
    })
    if (!data) {
        console.log("no users found");
        req.flash("middlewareError" , "خطا در ورود کاربر");
        return res.redirect(req.headers.referer || "/");
    }else{
        req.flash("middlewareSuccess" , "ورود کاربر با موفقیت انجام شد");
        return res.redirect(req.headers.referer || "/");
    }
  };

module.exports.getData=async(req,res)=>{
    var result=new Array()
 
        try {
            if(req.body.BlNumber){
                data=await sequelize.query
                ('SELECT        TOP (100) PERCENT dbo.TbBL.PNo, dbo.TbBL.FileNo, dbo.TbBL.HBL, dbo.TbBL.BLIssueDateH, ISNULL(dbo.TbVoyage.ETA, TbVoyage_1.ETA) AS ETA, ISNULL(dbo.TbVoyage.ArrivalDate, dbo.TbBLCAT.DischargeDate) '
                +'AS ArrivalDate, dbo.TbBL.DORcvdDate, dbo.TbBL.DOSendDate, dbo.TbCNTRBase.CNTR AS Sea_CNTR, dbo.TbCNTR.GateOut AS Sea_GateOut, dbo.TbCNTR.MTRTN AS Sea_MTRTN, dbo.TbTruck.TruckNo AS OverLand_TruckNo, '
                +'dbo.TbTruck.DispatchDate AS Overland_Dispatch, dbo.TbTruck.BorderCrossDate AS Overland_BorderCrossing, dbo.TbBLCAT.DischargeDate AS Overland_Discharge, dbo.TbBL.TransportationMode '
                +'FROM            dbo.TbTruck RIGHT OUTER JOIN '
                +'dbo.TbBLCAT RIGHT OUTER JOIN '
                +'dbo.TbBL LEFT OUTER JOIN '
                +' dbo.TbVoyage AS TbVoyage_1 ON dbo.TbBL.FirstVID = TbVoyage_1.ID ON dbo.TbBLCAT.TransportationMode = dbo.TbBL.TransportationMode AND dbo.TbBLCAT.BLID = dbo.TbBL.ID ON dbo.TbTruck.ID = dbo.TbBLCAT.CATID AND '
                +' dbo.TbTruck.TransportationMode = dbo.TbBLCAT.TransportationMode LEFT OUTER JOIN'
                +' dbo.TbCNTR ON dbo.TbBLCAT.TransportationMode = dbo.TbCNTR.TransportationMode AND dbo.TbBLCAT.CATID = dbo.TbCNTR.ID LEFT OUTER JOIN'
                +' dbo.TbCNTRBase ON dbo.TbCNTR.CNTRBaseID = dbo.TbCNTRBase.ID LEFT OUTER JOIN'
                +' dbo.TbVoyage ON dbo.TbBL.VID = dbo.TbVoyage.ID'
                +' WHERE        (dbo.TbBL.RecStatus > 0) AND (dbo.TbBL.HBL = :HBL)',{
                    replacements:{HBL:req.body.BlNumber},
                    type:QueryTypes.SELECT
                })
                if(data.length>0){

                    result.push(data)
                }
            }
            console.log(result)
             res.render("index",{
                pageTitle:'Track & Trace',
                result : result.length>0 ? result[0] : null
            })
        } catch (err) {
            console.log(err)          
        }

}

