const catagery=require("../model/CatageryModel");
const createcatagery=async (req,res) => {
    try{
        const{name,description,image,status}=req.body
        if(!name||!description||!image||!status){
            return res.status(401).json({
                message:"all field are required"
            })
        }
         const newcreate= await catagery.create({name,description,image,status})
            return res.status(201).json({
                message:"created sucessfully"
            })
         
    }catch(err){
        res.status(500).json({
            message:"internal server error",error:err.message
        })
    }


}
const getallcatagery=async (req,res) => {
    try{
        const data= await catagery.find();
    res.status(200).json({
        message:"get all catagery sucessfully",
        data:data
    })

    }
    catch(err){
        res.status(500).json({
            message:"internal server error",error:err.message
        })
    }
    
}
const catagerygetById=async (req,res) => {
    try{
 const{id}=req.params
const data=await catagery.findById(id)
if(!data){
  return  res.status(404).json({
        message:"catagery not found"
        
    })
}
res.status(200).json({
    message:"getById sucessfully ",
    data:data

})

}catch(err){
    res.status(501).json({
        message:"internal server error",error:err.message
    })
}

}
    

module.exports={createcatagery,getallcatagery,catagerygetById}