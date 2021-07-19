const express=require('express');

const {getData,showIndex,showProfile,showSignIn,login}=require('../controllers/indexControllers');

const router=express.Router();


router.get("/",showIndex)
router.get("/profile",showProfile)
router.get("/signIn",showSignIn)
router.post("/sendData",getData)
router.post("/login",login)

module.exports=router;