const mongoose =require("mongoose")
const userSchema=new mongoose.Schema(
    {
        full_name:{
            type:String,
            required:true,
        },
         email:{
            type:String,
            required:true,
            unique:true ,
        },
        phone_number:{
            type:Number,
            required:true

        },
        company_name:{
            type:String,
            required:true
        },
        GST_number:{
            type:String,
            required:true,

        },
        business_type:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,

        },
        confirm_password:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true,
    }

);
module.exports=mongoose.model("user",userSchema);