const Post = require('../models/post')
const Comment= require('../models/comment')
const User = require('../models/user')

module.exports.createPost = async function(req,res){
    let post =await Post.create({
        content:req.body.content,
        user:req.user._id
    })
   post= await Post.findById({_id:post._id}).populate('user','name');
    
   
        if(req.xhr){
            res.status(200).json({
                data:{
                    post: post,
                },
                message: "Post created"
            })
        }
        return res.redirect('back')

    }
    


module.exports.destroyPost = async function(req,res){
   try {
    let post = await Post.findById(req.params.id)
    if(post.user==req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id})

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post deleted"
            })
        }

            return res.redirect('back')
    }
   } catch (error) {
       console.log(error);
   }
   
}

