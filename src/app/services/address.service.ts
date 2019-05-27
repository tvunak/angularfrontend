import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  apiURL: string = 'http://localhost:8080/'
  deletedAddressEmitter: EventEmitter<Address> = new EventEmitter();
  newAddressEmitter: EventEmitter<Address> = new EventEmitter();
  updateAddressEmitter: EventEmitter<Address> = new EventEmitter();
  

  constructor(private http: HttpClient) { }

  getAddresses(id){
    let token = localStorage.getItem('userAccessToken');
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
      
    };
    return this.http.get(this.apiURL + 'api/address/'+id, httpOptions);
  }

  addAddress(address: Address){
    let token = localStorage.getItem('userAccessToken');
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
    };
    return this.http.post<Address>(this.apiURL + 'api/address', address, httpOptions);
  }

  removeAddress(id){
    let token = localStorage.getItem('userAccessToken');
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
      body: id
    };
    return this.http.delete(this.apiURL + 'api/address', httpOptions);

  }

  updateAddress(address: Address){
    let token = localStorage.getItem('userAccessToken');
    let bearerToken = "Bearer "+token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*','Authorization': bearerToken, 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
      observe: 'response' as 'response',
    };
    return this.http.put<Address>(this.apiURL + 'api/address', address, httpOptions);
  
  }


}
