const User = require('../models/user');
module.exports.profile= function(req,res){
   User.findById(req.params.id,function(err,user){
       if(err){
           console.log(err)
       }else{
          return res.render('user_profile',{
              title:"Profile page",
              user_profile:user
          })
       }
   })
}

module.exports.update = function(req,res){
   if(req.user.id==req.params.id){
       User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
          return res.redirect('back');
       })
   }else{
    return res.redirect('back');
   }         

}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
   
    return res.render('user_sign_up',{
        title:"Sign Up"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
  
    return res.render('user_sign_in',{
        title:"Sign In"
    })
}

module.exports.create= function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');

    }
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {console.log(`Error in signing up ${err}`)
        return;
    }
    if(!user){
        User.create(req.body,function(err,user){
            if(err)
            {console.log(`Error in signing up ${err}`)
            return;
        }
        return res.render('user_sign_in');
            
        })
    }
   
})
}


module.exports.createSessionmanual=function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
              console.log(`Error in signing in ${err}`)
        }
        if(user){
            if(user.password==req.body.password){
                res.cookie('user_id','user.id')
                return res.redirect('/users/profile')

            }else{
                return res.redirect('back');
            }

        }else{
            return res.redirect('back')
        }
    })    
}

module.exports.createSession= function(req,res){
    req.flash('success','Logged in successfully ');
    return res.redirect('/');
}

module.exports.destroySession= function(req,res){
    req.logout();
    req.flash('success','Logged out ');

    return res.redirect('/users/sign-in');
}