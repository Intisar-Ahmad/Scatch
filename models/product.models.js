const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');


const productSchema = mongoose.Schema({
   productName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    buyers: {
        type:[
            {
            buyer:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
            date:{
                type:Date,
                default:Date.now().toLocaleString()
            }
            }
        ]
       
    },
    quantity:{
        type:Number,
        default:0,
    },
    picture:{
        type:String
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        default:0
    },
    bgColor:{
        type:String,
        enum:["brown","orange","gray","green","blue","pink","red","purple","white"],
        default:"brown"
    },
    panelColor:{
        type:String,
        enum:["brown","orange","gray","green","blue","pink","red","purple"],
        default:"orange"
    },
    textColor:{
        type:String,
        enum:["brown","orange","gray","green","blue","pink","red","purple","black"],
        default:"white"
    }
}, { timestamps: true });

const product = mongoose.model("product",productSchema);

module.exports = product;