const express=require('express');
const {csrfProtection}=require('../utils/csrfProtection');

const {getData,showIndex,showProfile,showSignIn,login,logout}=require('../controllers/indexControllers');
const {printArrivalNotice}=require('../controllers/reportController');
const {loginRequired}=require('../middlewares/user');

const router=express.Router();

router.get("/profile",csrfProtection,showProfile)
router.get("/signIn",csrfProtection,showSignIn)
router.get("/sendData",loginRequired,csrfProtection,getData)
router.post("/login",login)
router.get("/logout",logout)
router.post("/printArrivalNotice",loginRequired,printArrivalNotice)
router.get("/",csrfProtection,showIndex)


module.exports=router;