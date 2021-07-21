const express=require('express');

const {getData,showIndex,showProfile,showSignIn,login}=require('../controllers/indexControllers');
const {printArrivalNotice}=require('../controllers/reportController');
const {loginRequired}=require('../middlewares/user');

const router=express.Router();


router.get("/",showIndex)
router.get("/profile",showProfile)
router.get("/signIn",showSignIn)
router.post("/sendData",loginRequired,getData)
router.post("/login",login)
router.get("/printArrivalNotice",printArrivalNotice)

module.exports=router;