var Stimulsoft = require('stimulsoft-reports-js');
const { v4: uuidv4 } = require('uuid');

module.exports.printArrivalNotice=(req,res)=>{


    Stimulsoft.Base.StiLicense.loadFromFile("report/license.key");  

    // Loading fonts
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("report/Roboto-Black.ttf");
    console.log("Font loaded");
    
    // Creating new report
    var report = new Stimulsoft.Report.StiReport();
    console.log("New report created");
    
    
    // Loading report template
    report.loadFile("report/ArrivalNotice.mrt");
    console.log("Report template loaded");
    
    var dbcnn = report.dictionary.databases.getByName("cnn");
    dbcnn.connectionString = "Data Source=37.156.29.46;Initial Catalog=tempOTMS;Persist Security Info=True;User ID=sa;Password=Kian@09122116470";

    report.dictionary.variables.getByName("ID").valueObject = 7;
    report.dictionary.variables.getByName("User").valueObject = 4040;
    
    // Renreding report
     report.renderAsync(() => {

    var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
	var buffer = new Buffer(data, "utf-8");
	var fs = require("fs");

    fileName=uuidv4()

	fs.writeFileSync(`report/${fileName}.pdf`, buffer);
        res.download(`report/${fileName}.pdf`)
    })
 
}

