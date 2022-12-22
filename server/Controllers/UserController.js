const  UserModel =require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')


//get a user
exports.getUser= async (req,res)=>{
    const id= req.params.id
    try{
        
        const user= await UserModel.findById(id);
        if(user){
            const {password, ...otherDetails}  =user._doc
            
           res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("No Such User")
           }
    }
    catch(error){
        res.status(500).json(error)
    }
}
//........................................................................................................//
//Update a user
exports.upDateUser =async(req,res)=>{
    const  id=req.params.id
    //currentUserId is the id of the user who is trying to perform updation
    const {_id,currentUserAdminstatus,password}=req.body
console.log(_id,currentUserAdminstatus,password,"reqboby")
    //means if I am the user who want to update my details or the admin who is authorised to update the details
    if(id===_id || currentUserAdminstatus){
        if(password){
            const salt =await bcrypt.genSalt(password,12)
            req.body.password = await bcrypt.hash(password, salt);
              }
        try {
            const user= await UserModel.findByIdAndUpdate(id, req.body,{new:true})  
            const token =jwt.sign(           
                {username:user.username,id:user.Id},process.env.JWT_KEY,{expiresIn:"1hr"}
        
            )
            console.log(user,"user ethi")
            
            res.status(200).json({user,token}) 
            } catch (error) {
                console.log('error');
            res.status(500).json(error)
           }
    }
    else{
        res.status(403).json("Acess Denied! You can only update your own profile")
    }
}
//...........................................................................................................//
//Delete a User
exports.deleteUser = async (req,res)=>{
    const id=req.params.id;

    const {currentUserId,currentUserAdminstatus}=req.body;

    if(id===currentUserId || currentUserAdminstatus){
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User Deleted Successfully");
        } catch (error) {
            res.status(500).json(error)
        }
      }
      else{
        res.status(403).json("Acess Denied! You can only Delete your own profile")
      }
}
//........................................................................................//
//Follow User
exports.followUser= async (req,res)=>{
   
   
    const id =req.params.id;
    const {_id}= req.body;
    
    
    //meaning that if the user is following himself/herself ,the action should be blocked
    if(_id ===id){
        res.status(403).json("Action Forbidden")
    }
    else{
        try {
            const followUser = await UserModel.findById(id);
           console.log(followUser)
           
            // this the  user who want to follow the above user
            const followingUser = await UserModel.findById(_id)
            console.log(followingUser,"FOllOWING USER")
            
            //means that the followers array includes the current userid, who want to follow the user, if not we have to push currentUserId to followers arryay.
            //along we also have to update the following array
            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push:{followers:_id}});

                await followingUser.updateOne({$push:{following:id}});
                res.status(200).json("User Followed!")

                } 
                else{
                    res.status(403).json("User is Already Followed by You")
                }
    }catch (error) {
            res.status(500).json(error)   
        }
    }
}
//............................................................................//
//Un Follow
exports.UnfollowUser= async (req,res)=>{
   
   
    const id =req.params.id;
    const {_id}= req.body;
    
    
    //meaning that if the user is UNfollowing himself/herself ,the action should be blocked
    if(_id ===id){
        res.status(403).json("Action Forbidden")
    }
    else{
        try {
            const followUser = await UserModel.findById(id);
           console.log(followUser)
           
            // this the  user who want to UNfollow the above user
            const followingUser = await UserModel.findById(_id)
            //console.log(followingUser,"FOllOWING USER")
            
            //means that the followers array includes the current userid, who want to follow the user, if yes we have to pull _id to followers arryay.
            //along we also have to update the following array
            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull:{followers:_id}});

                await followingUser.updateOne({$pull:{following:id}});
                res.status(200).json("User UnFollowed!")

                } 
                else{
                    res.status(403).json("User is not Following  You")
                }
    }catch (error) {
            res.status(500).json(error)   
        }
    }
}
//......................................................................//
exports.getAllUsers =async(req,res)=>{
    try {
        //it will only give us first 20 documents
       let users =await UserModel.find() ;

       users=users.map((user)=>{
       const {password, ...otherDetails} =user._doc;
return otherDetails;
})
   res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}