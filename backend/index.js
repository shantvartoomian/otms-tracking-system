const express=require('express');
const flash=require('connect-flash');

const {setStatics}=require('./utils/statics');
const setHeaders=require('./middlewares/setHeaders');
const sequelize=require('./utils/database');

const indexRoutes=require('./routes/index');

const app=express();

app.use(setHeaders)

app.use(express.json())

app.set("view engine","ejs");
app.set("views","../frontend/views")


setStatics(app)

app.use(flash())

app.use(indexRoutes)

sequelize.sync().then((result)=>{
    console.log(result)
    app.listen(3000,()=>{
        console.log('Server is running on Port 3000')
    })
}).catch((err)=>{
    console.log(err)
})
