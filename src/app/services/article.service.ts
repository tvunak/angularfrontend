import {Injectable, EventEmitter } from '@angular/core';
import { Article } from '../shared/article.model';
import { Observable, Subscription} from 'rxjs';
import { share } from 'rxjs/operators';
import { formatDate } from '@angular/common'

import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ArticleService{
    apiURL: string = 'http://localhost:8080/';
    articlIDs: Number[];
    private articleSubscription: Subscription;
    private articleObservable: Observable<Article[]>;
    deletedArticleEmitter: EventEmitter<any> = new EventEmitter();


    constructor(private http: HttpClient){
    }
    
    
    // dohvacanje svih artikala
    getArticles(): Observable<Article[]>{
        // if se koristi kako bi se izbjeglo preveliki broj get zahtjeva
        if (this.articleObservable){
            return this.articleObservable;
        }else{
            // not used anymore
            //const headers = new HttpHeaders({ Authorization: 'Basic ' + this.backendAuth });      , {headers}
            //return this.http.get<IArticle[]>('api/events').pipe(catchError(this.handleError<IEvent[]>('getEvents', [])))
            this.articleObservable = this.http.get<Article[]>(this.apiURL+'api/articles').pipe(share());
            return this.articleObservable;
        }
        
    }

    // dohvacanje jednog artikla
    getArticle(id:number): Observable<Article>{
        //const headers = new HttpHeaders({ Authorization: 'Basic ' + this.backendAuth });      {headers}
        return this.http.get<Article>(this.apiURL+'api/article/'+id);
    }

    // dohvacanje jednog artikla sa detaljima
    getArticleDetails(id:number): Observable<Article>{
        //const headers = new HttpHeaders({ Authorization: 'Basic ' + this.backendAuth });      {headers}
        return this.http.get<Article>(this.apiURL+'api/articleDetails/'+id);
    }



    // dodavanja ID-jeva artikla
    setArticlIds(articlids: Number[]){
        //articlids.forEach(articleid => {console.log(articleid)});
        this.articlIDs = articlids;
    }

    // dohvaćanje ID-jeva artikla
    getArticlIds(){
        //this.articlIDs.forEach(articleid => {console.log(articleid)});
        return this.articlIDs;
    }

    addArticle(name: string, price: string, date: string, description: string, manufacturer: string){
        // dodavanje trenutnog vremena
        let today= new Date();
        let currentFormatedTime = '';
        currentFormatedTime = formatDate(today, 'HH:mm', 'en-US');
        //creating body
        let body =  {"name": name, "price": price, "date":date, "time":currentFormatedTime, "articleDetail":{ "description": description, "manufacturer": manufacturer}}
        console.log(body);
        // get access token
        let token = localStorage.getItem('userAccessToken');
        let bearerToken = "Bearer "+token;
        console.log(bearerToken);
        //create headers

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
            observe: 'response' as 'response'
          };

        return this.http.post<Article>(this.apiURL+'api/article',body, httpOptions).subscribe(res =>{
            console.log(res);
        });
    }

    deleteArticle(article: Article){
        // get access token
        let token = localStorage.getItem('userAccessToken');
        let bearerToken = "Bearer "+token; 
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
            observe: 'response' as 'response',
            body: article.id
        };
        return this.http.delete(this.apiURL+'api/article', httpOptions);
    }    

    updateArticle(article: Article){
        let token = localStorage.getItem('userAccessToken');
        let bearerToken = "Bearer "+token; 
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
            observe: 'response' as 'response',
        };
        return this.http.put(this.apiURL+'api/article', article, httpOptions);
    }
}
