const express=require('express');

const {getData,showIndex,showProfile,showSignIn,login}=require('../controllers/indexControllers');
const {printArrivalNotice}=require('../controllers/reportController');
const {loginRequired}=require('../middlewares/user');

const router=express.Router();

router.get("/profile",showProfile)
router.get("/signIn",showSignIn)
router.get("/sendData",loginRequired,getData)
router.post("/login",login)
router.post("/printArrivalNotice",loginRequired,printArrivalNotice)
router.get("/",showIndex)
// router.get("/showReport",showReport)

module.exports=router;