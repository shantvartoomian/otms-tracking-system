const {Sequelize}=require('sequelize');

const sequelize=new Sequelize("tempOTMS","sa","Kian@09122116470",{
    dialect:'mssql',
    host:'37.156.29.46',
    dialectOptions:{
        options:{
            encrypt:false
        }
    }
})

// const sequelize=new Sequelize("OTMS","sa","Kian@09122116470",{
//     dialect:'mssql',
//     host:'localhost',
//     dialectOptions:{
//         options:{
//             encrypt:false
//         }
//     }
// })

module.exports=sequelize;