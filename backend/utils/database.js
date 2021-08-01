const {Sequelize}=require('sequelize');
const dotEnv=require('dotenv');
const path=require('path');

dotEnv.config({path:path.join(__dirname, '../config/config.env')}).parsed;

module.exports.sequelize=new Sequelize(process.env.DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect:'mssql',
    host:process.env.HOST,
    dialectOptions:{
        options:{
            encrypt:false
        }
    }
})
// module.exports.sequelize=new Sequelize("OTMS","sa","Kian@09122116470",{
//     dialect:'mssql',
//     host:'localhost',
//     dialectOptions:{
//         options:{
//             encrypt:false
//         }
//     }
// })
