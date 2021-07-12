const express=require('express');

const {getData,showIndex,showProfile}=require('../controllers/indexControllers');

const router=express.Router();


router.get("/",showIndex)
router.get("/profile",showProfile)
router.post("/sendData",getData)

module.exports=router;