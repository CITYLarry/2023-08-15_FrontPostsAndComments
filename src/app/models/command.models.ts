export type CreatePostCommand = {
  postId:string,
  author:string,
  title:string
}

export type AddCommentCommand = {
  commentId:string,
  postId:string,
  author:string,
  content:string
}