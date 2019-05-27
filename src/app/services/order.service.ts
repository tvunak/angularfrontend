import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Article } from '../shared/article.model';
import { Address } from '../models/address';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  apiURL: string = 'http://localhost:8080/';

  createOrder(articles: Article[], billingAddress: Address, deliveryAddress: Address){
    let userId = localStorage.getItem("loggedID");
    console.log("UserID: "+userId);
    let body = {"articles": articles, "billingAddressId": billingAddress.id, "deliveryAddressId": deliveryAddress.id, "userId": userId}
    this.http.post(this.apiURL+'api/order', body, httpOptions).subscribe((res: HttpResponse<any>) => {
      console.log("response received");
      console.log(res.body);
    });
  }
}
