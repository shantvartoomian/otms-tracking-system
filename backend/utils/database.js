const {Sequelize}=require('sequelize');

const sequelize=new Sequelize("OTMS","sa","Kian@09122116470",{
    dialect:'mssql',
    host:'localhost',
    dialectOptions:{
        options:{
            encrypt:false
        }
    }
})

module.exports=sequelize;