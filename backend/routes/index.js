const express=require('express');

const {getData,showIndex,showProfile,showSignIn,login}=require('../controllers/indexControllers');
const {loginRequired}=require('../middlewares/user');

const router=express.Router();


router.get("/",showIndex)
router.get("/profile",showProfile)
router.get("/signIn",showSignIn)
router.post("/sendData",loginRequired,getData)
router.post("/login",login)

module.exports=router;