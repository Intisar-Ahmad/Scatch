const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');


const ownerSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 8
    },
    products: {
        type: [
            {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
            }
        ],
        validate:{
            validator:function (array){
                return Array.isArray(array) && new Set(array.map(String)).size === array.length;
            },
            message:"Product already exists"
        }
    },
    picture:{
        type:String
    }
}, { timestamps: true });


ownerSchema.pre("save",async function Hashpassword(next) {
    if(!this.isModified(this.password)){
        return next();
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(this.password,salt);
    this.password = hash;
    next();
});


ownerSchema.methods.Comparepasswords = async function(PlainTextPassword){
    let result = await bcrypt.compare(PlainTextPassword,this.password);
    return result;
}

const Owner = mongoose.model("owner",ownerSchema);

module.exports = Owner;