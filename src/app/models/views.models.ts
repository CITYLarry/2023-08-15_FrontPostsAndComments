export type PostView = {
  aggregateId:string,
  author:string,
  title:string
  comments: CommentView[]
} 

export type CommentView = {
  id:string,
  postId:string,
  author:string,
  content:string
}