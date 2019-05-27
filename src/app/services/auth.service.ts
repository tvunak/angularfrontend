import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../models/user';
import { ToastrService} from 'ngx-toastr';
import { TokenService} from './token.service'


import { Role } from '../models/role';
import { Token } from '@angular/compiler';
import { UserService } from './user.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'X-Requested-With':'message/http', 'XMLHttpRequest':'application/json'}),
    observe: 'response' as 'response'
  };

@Injectable()
export class AuthService{


    apiURL: string = 'http://localhost:8080/';
    private loggedinUser; 
    private logedinSubject = new Subject<User>();
    private roleSubject = new ReplaySubject<Role>();
    private isLogedInSubject = new BehaviorSubject<boolean>(false); 
    private token : string ='';
    userRole: Role;
   

    constructor(private http: HttpClient, private toastr: ToastrService, private tokenService: TokenService, private userService: UserService){

    }

    getUserDetails(username: string, password: string){
        
        let body = {"username": username, "password": password}
        let requestLogin = this.http.post(this.apiURL+'api/user/login', body, httpOptions).subscribe((res: HttpResponse<any>) => {
            let bererToken: string = res.headers.get('Authorization');
            let token = bererToken.slice(7, bererToken.length)
           
            let validToken = this.tokenService.validateJWTToken(token, username);
            if (validToken){
                this.setToken(token);
            }else{
                this.logOutUser();
            }
            
            this.setLogedInUsername(<User>res.body);

            // const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
            // this.http.post(this.apiURL+'api/user/role',{"username": username}, {headers}).subscribe(data =>{
            //     let role = <Role> data;
            //     console.log(role);
            //     this.setUserRole(role)
            //     this.toastr.info("User loged in sucessfully", "Info"); 
            // });
        },error => {
            console.log(error)
            this.toastr.error(error.toString(), "Error");
        });
        
        return requestLogin;  
    }

    setLogedInUsername(user: User){
        console.log(user);
        this.logedinSubject.next(user);
        this.isLogedInSubject.next(true);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('loggedUsername', user.username);
        
        if(user.authorities[0].authority !== null){
            if (user.authorities[0].authority === "ROLE_ADMIN"){
                localStorage.setItem('isUserAdmin', 'true');
              }else{
                localStorage.setItem('isUserAdmin', 'false');
              }
        }else{
            localStorage.setItem('isUserAdmin', 'false'); 
        }
        //this will fetch user object and store it in service under "loggedinUser"
        this.userService.getUserDetails().subscribe(response =>{
            console.log(response.body);
            this.loggedinUser = response.body;
            localStorage.setItem('loggedID', this.loggedinUser.id.toString());

        });
        
    }

    // 
    getLogedInUserObservable(){
        return this.logedinSubject.asObservable();
    }
    
    // check in session storage if user is logged in, send information using subject, send subject
    isUserLogedIn(){
        let isUserLogedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
        this.isLogedInSubject.next(isUserLogedIn);
        return this.isLogedInSubject;
    }

    //set informations about user Role and pass it to subscribers
    setUserRole(role: Role){
        this.userRole = role;
        this.roleSubject.next(role);
    }

    //fetch observable about user Role
    getUserRole(){
        return this.roleSubject.asObservable();
        
    }
    
    //return user token
    private getToken(){
        return this.token;
    }
    //set user token
    private setToken(token){
        this.token = token;
    }
    logOutUser(){
        localStorage.setItem('loggedIn', 'false');
        localStorage.setItem('isUserAdmin', 'false');
        localStorage.removeItem('loggedUsername');
        localStorage.removeItem('userAccessToken');
        localStorage.removeItem('loggedID');
        
        this.isLogedInSubject.next(false);
        return this.isLogedInSubject.asObservable();
    }

    getLogedInUser(){
        return this.loggedinUser;
    }

    


}