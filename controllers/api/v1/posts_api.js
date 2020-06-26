const Post = require('../../../models/post')
const Comment= require('../../../models/comment')


module.exports.index =async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comment',
        options: { sort: { 'createdAt': -1 } },
        populate:{
            path:'user'
        }
    })
    return res.json(200,{
        message:"list of posts",
        posts:posts
    })
}

module.exports.destroyPost = async function(req,res){
    try {
     let post = await Post.findById(req.params.id)
     
         if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id})
    
           //  if(req.xhr){
           //      return res.status(200).json({
           //          data:{
           //              post_id:req.params.id
           //          },
           //          message:"Post deleted"
           //      })
           //  }
           res.json(200,{
               message:"Posts and cmnts deleted"
           })
         }else{
            return res.json(401,{
                message:"Cant delete"
            })
         }
 
     
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:"Internal server error"
        })
    }
    
 }
 
 