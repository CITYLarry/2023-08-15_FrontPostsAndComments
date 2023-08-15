export type CreatePostCommand = {
  postId:string,
  postAuthor:string,
  title:string
}

export type AddCommentCommand = {
  commentId:string,
  postId:string,
  commentAuthor:string,
  content:string
}