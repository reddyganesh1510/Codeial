const Post = require('../models/post')
// module.exports.home = function(req,res){
//  Post.find({},function(err,posts){
//      if(err){
//          console.log(`error in finding posts ${err}`);
//          return;
//      }
//      return res.render('home',{
//          title:"home",
//          posts:posts,
//      })
     
//  })

 module.exports.home=function(req,res){
     Post.find({})
     .populate('user')
     .populate({
         path:'comment',
         populate:{
             path:'user'
         }
     }).exec(function(err,posts){
    if(err){
        console.log(`error in finding posts ${err}`);
        return;
    }
    return res.render('home',{
        title:"home",
        posts:posts,
    })
 })
}

