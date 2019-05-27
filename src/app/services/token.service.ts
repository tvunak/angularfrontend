import { Injectable } from '@angular/core';
import { IToken } from '../models/token';
import * as JWT from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  validateJWTToken(token: string, username: String){
    console.log(token);
    //decode token
    var decoded: IToken = JWT(token); 
    // get current unix time
    var currentUnixTime =  Math.round(Date.now() / 1000);
    if (decoded.sub !== username){
      console.log("invalid username in token");
      return false;
    }else if(currentUnixTime >  decoded.exp){
      console.log("invalid time in token");
      return false;
    }
    //storing access token in localStorage
    localStorage.setItem('userAccessToken', token)
    return true;

  }

  getUsernameFromToken(){
    //fetch token from local storage
    var token = localStorage.getItem('userAccessToken');
    console.log(token);
    //decode token
    var decoded: IToken = JWT(token); 
    if (decoded.sub !== ""){
      return decoded.sub;
    }

  }
}
