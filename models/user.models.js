const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    cart: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },

        ],
        validate: {
            validator: function (array) {
                return Array.isArray(array) && new Set(array.map(String)).size === array.length
            },
            message: "Already in cart"
        }
    },
    password: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 8
    },
    orders: {
        type: [
            {
                ordername: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product"
                },
                date:{
                    type:Date,
                    default:Date.now().toLocaleString()
                }
            }
        ]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    picture:{
        type:String
    },
    contact:{
        type:Number,
        maxlength:20
    },
    address:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    }
}, { timestamps: true });


userSchema.pre("save",async function Hashpassword(next) {
    if(!this.isModified(this.password)){
        return next();
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(this.password,salt);
    this.password = hash;
    next();
});


userSchema.methods.Comparepasswords = async function(PlainTextPassword){
    let result = await bcrypt.compare(PlainTextPassword,this.password);
    return result;
}

const User = mongoose.model("user",userSchema);

module.exports = User;