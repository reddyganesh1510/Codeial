const Post = require('../models/post')
const Comment= require('../models/comment')

module.exports.createComment = async function(req,res){
    try {
        let post= await Post.findById(req.body.post)
            if(post){
                    let comment =await Comment.create({
                    content:req.body.comment,
                    user:req.user._id,
                    post:req.body.post 
                        }) 
                    post.comment.push(comment);
                    post.save()
                    res.redirect('back')
                
            }
        } catch (error) {
            console.log(error)
    }
}


module.exports.destroyComment= function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment){
            let postId = comment.post
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}});
            return res.redirect('back');
        }
        return res.redirect('back');

    })
}