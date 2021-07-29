const express=require('express');
const flash=require('connect-flash');
const dotEnv=require('dotenv');
const session = require("express-session");
var cookieParser = require('cookie-parser')
const path = require('path');
const bodyParser=require('body-parser');

const setHeaders=require('./middlewares/setHeaders');
const {checkLogin}=require('./middlewares/user');
const {sequelize}=require('./utils/database');

const indexRoutes=require('./routes/index');

const app=express();

app.use(setHeaders)

app.use(express.json())

app.set("view engine","ejs");
app.set("views","../frontend/views")

app.use(
    session({
      secret: "1R4e_*tnCx$^53dn#?",
      saveUninitialized: false,
      resave: false
    })
);
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, "../backend/report")));
app.use(express.static(path.join(__dirname, '../frontend/')));
app.use(checkLogin);
app.use(flash())
app.use(cookieParser())


app.use(indexRoutes)

sequelize.sync().then((result)=>{
    console.log(result)
    app.listen(3000,()=>{
        console.log('Server is running on Port 3000')
    })
}).catch((err)=>{
    console.log(err)
})
