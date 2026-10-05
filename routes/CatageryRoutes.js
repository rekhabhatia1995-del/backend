const express=require("express");
const router=express.Router();

const {createcatagery,getallcatagery,catagerygetById}=require("../controllers/CatageryController")

router.post("/create",createcatagery);
router.get("/getall",getallcatagery);
router.get("/getbyid/:id", catagerygetById);





module.exports=router;