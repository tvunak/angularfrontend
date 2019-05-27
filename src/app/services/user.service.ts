import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserDetails } from '../shared/userDetails.model';
import { User } from '../models/user';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  apiURL: string = 'http://localhost:8080/'
  deletedUserEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  deleteUser(username: string, email:string){
    console.log(username);
    console.log(email);
    let token = localStorage.getItem('userAccessToken');
    console.log(token);
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
      body: {"username": username, "email": email}
    };

    return this.http.delete(this.apiURL+'api/user', httpOptions);
  }

  updateUser(userData: IUserDetails){
    let token = localStorage.getItem('userAccessToken');
    console.log(token);
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
    };

    return this.http.put(this.apiURL+'api/user', userData, httpOptions,);
  }

  getUserDetails(){
    let token = localStorage.getItem('userAccessToken');
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
    };
    let username = this.tokenService.getUsernameFromToken();
    let body = {"username": username }
    return this.http.post<User>(this.apiURL+'api/user/profile', body, httpOptions);
  }
}
