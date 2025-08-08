const mongoose = require(`mongoose`);
const {Schema}=mongoose;

const PageSchema = new Schema({
    
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date:{
        type:Date,
        default:Date.now
    },
    title:
    {
        type:String,
        required:true
    },

    description:
    {
        type:String,
        required:true
    },

    tag:
    {
        type:String,
        default:"General"  
    }
})

module.exports= mongoose.model(`page`,PageSchema);