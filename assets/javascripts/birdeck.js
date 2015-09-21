$(document).ready(function(){
  fetchPost()
  fetchPostButton()
  createPost()
  deletePost()
})

function fetchPostButton() {
  $("#fetch-button-posts").on("click", function(){
    fetchPost()
  })
}

function fetchPost() {
  var newestItemID = parseInt($(".post").last().attr("data-id"))
  $.ajax({
    type:    "GET",
    url:     "https://turing-birdie.herokuapp.com/api/v1/posts.json",
    success: function(posts) {
      $.each(posts, function(index, post){
        if (isNaN(newestItemID) || post.id > newestItemID) {
          renderPost(post)
        }
      })
    }
  })
}

function createPost() {
  $("#create-post").on("click", function(){
    var postParams = {
      post: {
        description: $("#post-description").val()
      }
    }

    $.ajax({
      type:    "POST",
      url:     "https://turing-birdie.herokuapp.com/api/v1/posts.json",
      data:    postParams,
      success: function(post) {
        renderPost(post)
      }
    })
  })
}

function renderPost(post) {
  $("#latest-posts").append(
    "<div class='post' data-id='"
    + post.id
    + "'><h6>Published on "
    + post.created_at
    + "</h6><p>"
    + post.description
    + "</p><button id='delete-post' class='btn btn-default btn-xs'>Delete</button></div>"
  )
}

function deletePost() {
  // delegate: only do the thing if you exist
  $("#latest-posts").delegate("#delete-post", "click", function(){
    var $post = $(this).closest(".post")

    $.ajax({
      type:    "DELETE",
      url:     "https://turing-birdie.herokuapp.com/api/v1/posts/" + $post.attr("data-id") + ".json",
      success: function() {
        $post.remove()
      },
      error: function() {
        $post.remove()
      }
    })
  })
}