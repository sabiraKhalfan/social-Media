const { off, findOneAndDelete } = require('../Models/postModel');
const PostModel =require('../Models/postModel');
const { post } = require('../Router/PostRouter');
const UserModel =require('../Models/userModel');
const { default: mongoose } = require('mongoose');




//Create A  new post
exports.createPost =async(req,res)=>
{
   // console.log("reached hererer r",req.body)
    // Here as soon as we receive our req.body, we are impenting it to our post model,
    
    const newPost = new PostModel(req.body);
    try {
        await newPost.save();
        await User.populate(post, {
            path: "userId",
            select: { username: 1, firstname: 1, lastname: 1, profilePicture: 1 },
          });
          const newPost = {
            ...post._doc,
            userId: post.userId._id,
            username: post.userId.username,
            firstname: post.userId.firstname,
            lastname: post.userId.lastname,
            profilePicture: post.userId.profilePicture,
          };
          let message = "New post created successfully";
          if (newPost.scheduledDate) message = "Post scheduled successful";

        res.status(200).json(message,newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}
//...................................................................................
//Get a post
exports.getPost =async (req,res)=>{
    const id=req.params.id;
    try {
        const post = await PostModel.findById(id);
         res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}
//.............................................................................................//
//Update a post
exports.updatePost = async(req,res)=>{
    const postId=req.params.id;
    const {userId} =req.body
    try {
       const post = await PostModel.findById(postId)
       // here no other person can't update the post of any other person
        if(post.userId==userId){
            await PostModel.updateOne({$set:req.body})
            res.status(200).json("Post Updated")

        }
        else{
            res.status(403).json("action forbidden")
        }
    } catch (error) {
       res.status(500).json(error) 
    }
}
//..................................................................//
//Delete a post

exports.deletePost = async(req,res)=>{
    const postId =req.params.id;
    console.log(req.body)
    const {userId} =req.body;
    try {
        
        const post=  await PostModel.findById(postId)
        console.log(post)
        if(post.userId===userId){


            //deleteOne is used to delete the first document that matches the conditions from the collection.
            await PostModel.deleteOne();
            res.status(200).json("Post seleted successfully")
        }
        else{
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
//..............................................................................................//
//like and dislike a post
exports.likes= async (req,res)=>{
    const postId= req.params.id;
    const {userId} =req.body;
    
    try {
        const post = await PostModel.findById(postId);
        console.log(post,"posts")
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}})
            res.status(200).json("Post Liked")
        }
        else{
            await post.updateOne({$pull:{likes:userId}})
            res.status(200).json("Post Unliked") 
        }
        }

    catch (error) {
        res.status(500).json(error)
    }


}
//...............................................................//
//Get Time line post---the thime line post of a user includes his posts and post of the person he is following
exports.getTimelinePosts =async(req,res)=>{
    const userId =req.params.id;
    try {
        console.log("hi")
        const currentUserPost = await PostModel.find({userId:userId});
        //console.log(currentUserPost,"cpppppppppp")
        
        //const followingPost =await UserModel.find({_id:userId}).populate().lean()
        
    const followingPosts = await UserModel.aggregate([
        { 
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
    
          //sorting in descending order
           
        res.status(200).json(currentUserPost 
            .concat(...followingPosts[0].followingPosts)
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            }))
        

    } catch (error) {
        
    }
}