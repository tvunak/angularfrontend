import { Injectable } from '@angular/core';
import { IUserDetails } from '../shared/userDetails.model';
import { Subject }from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  logedinSubject = new Subject<IUserDetails[]>();
 

  apiURL: string = 'http://localhost:8080/';

  token = localStorage.getItem('userAccessToken');
  private bearerToken = "Bearer "+this.token;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': this.bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) {}
  
   getAllUsers(){
    this.token = localStorage.getItem('userAccessToken');
    this.bearerToken = "Bearer "+this.token;
    this.http.get(this.apiURL+'api/user', this.httpOptions).subscribe((res: HttpResponse<any>) => {
      let userDetails: IUserDetails[] = res.body;
      this.logedinSubject.next(userDetails);
      
   });
  }

  getUsersSubject(){
    return this.logedinSubject;
  }
}
