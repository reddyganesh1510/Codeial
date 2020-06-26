const Post = require('../models/post')
const User = require('../models/user')

 module.exports.home= async function(req,res){
    try {
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
        
      let users= await User.find({});
           
       return res.render('home',{
               title:"Home",
               posts:posts,
               users_list:users
           })
       
    } catch (error) {
        console.log("Error at home",error)
    }
}

