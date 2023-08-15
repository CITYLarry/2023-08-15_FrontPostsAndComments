import { CreatePostCommand, AddCommentCommand } from './../../models/command.models';
import { PostView } from './../../models/views.models';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  /*GET_ALL_POSTS_URL = 'https://beta-posts-comments.herokuapp.com/bring/all/posts'
  GET_POST_BY_ID_URL = 'https://beta-posts-comments.herokuapp.com/bring/post/'
  POST_POST_URL = 'https://alpha-posts-comments.herokuapp.com/create/post'
  POST_COMMENT_URL = 'https://alpha-posts-comments.herokuapp.com/add/comment'*/

  GET_ALL_POSTS_URL = 'http://beta:8081/api/v1/BringAllPosts'
  GET_POST_BY_ID_URL = 'http://beta:8081/api/v1/BringPost/'
  POST_POST_URL = 'http://alpha:8080/api/v1/CreatePost'
  POST_COMMENT_URL = 'http://alpha:8080/api/v1/AddComment'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get<PostView[]>(this.GET_ALL_POSTS_URL).pipe(
      catchError(this.handleError<PostView[]>('getPosts', []))
    );
  }

  getPostsById(id:string|null){
    return this.http.get<PostView>(`${this.GET_POST_BY_ID_URL}${id}`).pipe(
      catchError(this.handleError<PostView>('getPosts'))
    );
  }

  createPost(command:CreatePostCommand){
    return this.http.post<any>(this.POST_POST_URL, command, this.httpOptions).pipe(
      catchError(this.handleError<any>('createPost'))
    );
  }

  createComment(command:AddCommentCommand){
    return this.http.post<any>(this.POST_COMMENT_URL, command, this.httpOptions).pipe(
      catchError(this.handleError<any>('createPost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
