import { Component, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs'
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';




@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit{


  logedUsername: string;
  subscription: Subscription;
  roleSubscription: Subscription;
  private isAdmin: boolean = false;
  private user:User;
  private isLogedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.fetchUsername();
    this.checkIfLoggedin();
    this.checkIfAdmin();
  }

  ngOnInit() {
    this.logedUsername = localStorage.getItem('loggedUsername') || '';
    
    this.isAdmin = JSON.parse(localStorage.getItem('isUserAdmin') || 'false');

    
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  fetchUsername(){
    
  this.subscription = this.authService.getLogedInUserObservable().subscribe(data =>{
    console.log("fetching User from api");
    console.log(data);
    this.user = data;
    this.logedUsername= this.user.username;

    
    });
  }

  checkIfAdmin(){
    this.subscription = this.authService.getLogedInUserObservable().subscribe(data =>{ 
      if (this.user.authorities[0].authority === "ROLE_ADMIN"){
        this.isAdmin=true;
        console.log("user admin role set to true");
      }else{
        this.isAdmin=false;
        console.log("user admin role set to false");
      }
    });
    
  }

  checkIfLoggedin(){
    this.authService.isUserLogedIn().subscribe(response =>{
      if(response)
        this.isLogedIn = true;
      else 
        this.isLogedIn = false;
    });
  }

  logOut(){
    this.isLogedIn = false;
    this.logedUsername = null;
    this.isAdmin=false;
    this.authService.logOutUser().subscribe( response =>{
      this.isLogedIn = response;
    });
    this.router.navigate(['/events']);
  }


}
