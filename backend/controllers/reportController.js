var Stimulsoft = require('stimulsoft-reports-js');
const { v4: uuidv4 } = require('uuid');
var fs = require("fs");
const {QueryTypes} = require('sequelize');

const sequelize=require('../utils/database');


module.exports.printArrivalNotice=async(req,res)=>{

    
    try {
        data=await sequelize.query
        ('SELECT  dbo.TbArrivalNoticeH.ID FROM    dbo.TbArrivalNoticeH INNER JOIN dbo.TbBL ON dbo.TbArrivalNoticeH.BLID = dbo.TbBL.ID '
        +'WHERE      (dbo.TbBL.HBL = :HBL)',{
            replacements:{HBL:req.query.hbl},
            type:QueryTypes.SELECT
        })
        if (data.length>0) {
    
        Stimulsoft.Base.StiLicense.loadFromFile("report/license.key");  
    
        // Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("report/Roboto-Black.ttf");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("report/BNazanin.ttf");
    
        var report = new Stimulsoft.Report.StiReport();
        
        report.loadFile("report/ArrivalNotice.mrt");
    
        var dbcnn = report.dictionary.databases.getByName("cnn");
        var config=sequelize.config
        dbcnn.connectionString = `Data Source=${config.host};Initial Catalog=${config.database};Persist Security Info=True;User ID=${config.username};Password=${config.password}`;
    
        report.dictionary.variables.getByName("ID").valueObject = data[0].ID;
        report.dictionary.variables.getByName("User").valueObject = 4040;
    
        fileName=uuidv4()

        report.renderAsync(async()=>{

            var data =await report.exportDocument(Stimulsoft.Report.StiExportFormat.Html);

            //fs.writeFileSync(`report/temp/${fileName}.html`, data);
           return res.send(data)
    
         })
    }else{
        req.flash("middlewareError" , "اعلامیه ورود صادر نشده است");
        return res.redirect("/");
    }
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
    
}
