const mongoose =require("mongoose");
const catageryScheema= new mongoose.Schema({
    
name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "active"
    }
})
 module.exports=mongoose.model("catagery",catageryScheema)