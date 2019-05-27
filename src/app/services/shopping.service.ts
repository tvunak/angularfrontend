import { Injectable, EventEmitter } from '@angular/core';
import { Article } from '../shared/article.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private shoppingCartItems: Article[] = [];
  apiURL: string = 'http://localhost:8080/'
  shoppingCartSubject: BehaviorSubject<Article[]> = new BehaviorSubject(this.shoppingCartItems);

  constructor(private http: HttpClient, private authService: AuthService) { }

  

  addArticleToCart(article: Article){
    
    let user: User = this.authService.getLogedInUser();
    console.log(user);
    let token = localStorage.getItem('userAccessToken');
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
      
    };
    
    let userId = localStorage.getItem('loggedID');

    if(userId != null){
      let body = {"userId": userId, "articleId": article.id }
    return this.http.post(this.apiURL+'api/basket', body, httpOptions).subscribe(response =>{
      let receivedArtice = <Article> response.body;
      console.log(receivedArtice);
      this.shoppingCartItems.push(article);
      console.log(article);
    });
    }else{
      this.shoppingCartItems.push(article);
      this.shoppingCartSubject.next(this.shoppingCartItems);
    }
    
    
  }

  getItemsFromCart(){
    let token = localStorage.getItem('userAccessToken');
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
    };

    let userId = localStorage.getItem('loggedID');
    if(userId != null){
      return this.http.get(this.apiURL+'api/basket/'+userId, httpOptions);
    }
    
  }

  removeItemFromCart(article: Article){
    let token = localStorage.getItem('userAccessToken');
    let userId = localStorage.getItem('loggedID');
    let bearerToken = "Bearer "+token;
    let bodyValue = { "userId": userId, "articleId": article.id }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
      body: bodyValue
    };

    
    if(userId != null){
      return this.http.delete(this.apiURL+'api/basket', httpOptions);
    }
  }
}
