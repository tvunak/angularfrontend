import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';




@Injectable()
export class RegistrationService{
    constructor(private http: HttpClient){

    }
    apiURL: string = 'http://localhost:8080/';

    sendRegistration(username, email, password, name, middleName, lastName): Observable<any>{
        let body = {"username": username, 
        "email": email,
        "password": password,
        "name": name,
        "middleName": middleName,
        "lastName": lastName,
        }
        return this.http.post<any>(this.apiURL+'api/user/add',body);
    }

}