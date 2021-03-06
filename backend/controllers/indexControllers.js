const {QueryTypes} = require('sequelize');
const {sequelize}=require('../utils/database');
const moment=require('moment');

module.exports.showIndex=async(req,res)=>{
var path=require('path');
path.join(__dirname,'/frontend/views/index.ejs')
    res.render("index",{
        pageTitle:'Track & Trace',
        result:null,
        middlewareError: req.flash("middlewareError")[0],
        middlewareSuccess: req.flash("middlewareSuccess")[0],
        session:req.session,
        csrfToken: req.csrfToken(),
    })
}

module.exports.showProfile=async(req,res)=>{
    res.render("profile",{
        pageTitle:'Track & Trace',
        session:req.session,
        csrfToken: req.csrfToken(),
    })
}

module.exports.showSignIn=async(req,res)=>{
    res.render("signIn",{
        pageTitle:'Track & Trace',
        middlewareError: req.flash("middlewareError")[0],
        middlewareSuccess: req.flash("middlewareSuccess")[0],
        csrfToken: req.csrfToken(),
    })
}

module.exports.login = async(req, res) => {
    const _username = req.body.loginUsername.toLowerCase();
    const _password = req.body.loginPassword;
  
    if(!_username || !_password ){
      req.flash("middlewareError" , "لطفا نام کاربری و رمز عبور خود را وارد نمایید");
      return res.redirect(req.headers.referer || "/");
    }
    data=await sequelize.query
    ('SELECT        ID, DesEn, DesFa, Email, password '
    +'FROM            TbEntity '
    +'WHERE        (RecStatus > 0) AND (NationalID = :Username) AND (Text1 = :Password)',{
        replacements:{Username:_username,Password:_password},
        type:QueryTypes.SELECT
    })
    if (!data.length>0) {
        console.log("no users found");
        req.flash("middlewareError" , "خطا در ورود کاربر");
        return res.redirect(req.headers.referer || "/");
    }else{
        req.session.isLogedin = true;
        req.session.user = data[0];
        if (req.body.rememberCheck) {
            req.session.cookie.originalMaxAge = 60*60*24*30*1000;
          }else{
            req.session.cookie.expire = null; 
          }
        req.flash("middlewareSuccess" , "ورود کاربر با موفقیت انجام شد");
        return res.redirect("/");
    }
  };

  module.exports.logout=(req,res)=>{
        req.session.isLogedin = false;
        req.session.user = null;
        const _url = req.headers.referer.split("?")[0];
        if (_url.toLowerCase().includes("/senddata") || _url.toLowerCase().includes("/profile") || _url.toLowerCase().includes("/resultpage")  ) {
          res.redirect("/");
        } else {
          res.redirect(_url);
        }
  }

module.exports.getData=async(req,res)=>{
    var result=new Array()
 
        try {
            if(req.query.BlNumber){
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
                    replacements:{HBL:req.query.BlNumber},
                    type:QueryTypes.SELECT
                })
                if(data.length>0){

                    result.push(data)
                }
                res.render("resultPage",{
                    pageTitle:'Track & Trace',
                    result : result.length>0 ? result[0] : null,
                    middlewareError: req.flash("middlewareError")[0],
                    middlewareSuccess: req.flash("middlewareSuccess")[0],
                    session:req.session,
                    moment,
                    csrfToken: req.csrfToken(),
                })
            }else{
                res.redirect('/')
            }
            
        } catch (err) {
            console.log(err)          
        }

}

// module.exports.showReport=async(req,res)=>{
//     res.render("showReport",{
//         pageTitle:'Track & Trace'
//     })
// }

