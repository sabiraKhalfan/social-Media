const jwt =require('jsonwebtoken');

const  UserModel =require('../Models/userModel') ;



//Registering a new user
exports.registerUser = async function (req,res,next){

 
   const newUser =new UserModel({
     username:req.body.username,
     password: req.body.password,
     firstname:req.body.firstname,
     lastname:req.body.lastname

   })
   const {username} =req.body
  // console.log(username)
    
   try{

    const oldUser =await UserModel.findOne({username:username})
    if(oldUser){
      return res.json({message:"User Already Registerd"})
    }
    
     const user =await newUser.save();
     //console.log(user);


     const token=jwt.sign({
      username: user.username,
      id:user._id
     },process.env.JWT_KEY,{expiresIn:'1hr'});
   
    res.status(200).json({user,token})
  }
  
   catch(error){
     res.status(500).json({message:error.message})
   }
}
//......................................................................................//
//login
exports.toLogin =async (req,res)=>{
  const { username, password } = req.body
  if (!(username && password)) {
    return res.status(400).send("All input is required");
    
  }
  // Validate if user exist in our database
  try{
    const user = await UserModel.findOne({ username })
    if (!user || !(await user.correctPassword(password, user.password))) {

      return res.status(401).json({
        status: 'fail',
        message: "User not exist"
      })
    }

      else{
        const token=jwt.sign({
          username: user.username,
          id:user._id
         },process.env.JWT_KEY,{expiresIn:'1hr'});
         console.log(token);

        return res.status(200).json({user,token})
      }


  }catch(error){
  console.log(error)
  }
  



}