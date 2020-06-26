{
let createPost =function(){
    let newPostForm = $('#post-form')
    newPostForm.submit(function(e){
        e.preventDefault(); 
        $.ajax({
            type:'post',
            url:'/posts/create-post',
            data: newPostForm.serialize(), 
            success: function(data){
                
                let newPost = newPostDom(data.data.post);
                $('#post-container').prepend(newPost);
                deletePost($(' .delete-post-button',newPost))
                newComment(data.data.post._id);
            },
            error:function(error){
                console.log(error.responseText);
            }
        })
    })
} 

let newComment = function(id){

    let newCommentform = $(`#comment-form-${id}`)
    newCommentform.submit(function(e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/comments/create-comment',
            data: newCommentform.serialize(), 
            success: function(data){
            
                let newComment= newCommentDom(data.data.comment);
                $(`#comments-container-${data.data.comment.post}`).prepend(newComment);
                console.log(data.data.comment._id);
                deleteComment($(' .delete-comment-button',newComment),data.data.comment._id);
                
               
            },
            error:function(error){
                console.log(error.responseText);
            }
        })
    })
}

let newPostDom = function(post){
    return $(`<div id="post-${post._id}">
    <div id="heading">
        <p>${post.user.name}
                <a class="delete-post-button" href="/posts/delete/${post._id}">x</a>
           </p>
           </div>
    <div id="post">
        <p>${post.content}</p></div>
        
              <section id="comment-section">
                  <form action="/comments/create-comment" id="comment-form-${post._id}" class="comment-form-class" method="POST">
              <textarea name="comment" id="new-comment" cols="30" rows="2"></textarea>
              <input type="hidden" name="post" value="${post._id}">
              <input type="submit" >
              
                  </form>
                  <div id="comments-container-${post._id}">
                  
                  </div>
                
                </section>
           
           
   
  </div>`)
}

let newCommentDom = function(comment){
    return $(`
    <div id="comment-${comment._id}">
    <p>${comment.content}
            <a class="delete-comment-button" href="/comments/delete/${comment._id}">x</a>
        <br>${comment.user.name}</p>
</div>
   `)}

let deletePost =function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type :'get',
            url :$(deleteLink).prop('href'),
            success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
            },
            error:function(error){
                console.log(err.responseText)
            }
        })
    })
}

let deleteComment = function(deleteLink,id){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type :'get',
            url :$(deleteLink).prop('href'),
            success:function(data){
                    $(`#comment-${id}`).remove();
            },
            error:function(error){
                console.log(err.responseText)
            }
        })
    })
}

let commentdeletelinks =$(' .delete-comment-button')
for(commentdeletelink of commentdeletelinks){
   id=$(commentdeletelink).prop('id');
    deleteComment(commentdeletelink,id)
}

let deletelinks = $(' .delete-post-button');
for( deletelink of deletelinks){
    deletePost(deletelink);
}

let posts = $(' .postx')
for(post of posts){
    let id=$(post).prop('id').split('-')[1];
    newComment(id);
}



createPost();


}
