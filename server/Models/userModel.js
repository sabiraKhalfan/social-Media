const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        reqiured:true
    },
    lastname:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture:String,
    coverPicture:String,
    about:String,
    livesIn:String,
    worksAt:String,
    relationship:String,
    country:String,
    followers:[],
    following:[],  
},
{ timestamps: true })


UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();
    this.password =  await bcrypt.hash(this.password, 12);
    //console.log(this.password)
   
  })
  
   UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  
     return await bcrypt.compare(candidatePassword, userPassword)
  }
const UserModel =mongoose.model('User', UserSchema);
module.exports = UserModel;
