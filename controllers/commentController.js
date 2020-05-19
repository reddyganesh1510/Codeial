const Post = require('../models/post')
const Comment= require('../models/comment')

    module.exports.createComment = function(req,res){
       
    
        Post.findById(req.body.post,function(err,post){
            if(post){
                
                Comment.create({
                    content:req.body.comment,
                    user:req.user._id,
                    post:req.body.post   
                },function(err,comment){
                    post.comment.push(comment);
                    post.save()
                    res.redirect('back')
                })
            }
        })
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