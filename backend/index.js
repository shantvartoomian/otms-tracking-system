const express=require('express');
const bodyParser=require('body-parser');

const {setStatics}=require('./utils/statics');
const sequelize=require('./utils/database');

const indexRoutes=require('./routes/index');

const app=express();

app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine","ejs");
app.set("views","../frontend/views")

setStatics(app)

app.use(indexRoutes)

sequelize.sync().then((result)=>{
    console.log(result)
    app.listen(3000,()=>{
        console.log('Server is running on Port 3000')
    })
}).catch((err)=>{
    console.log(err)
})
