import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }


  onSubmit(username: string, password: string){


    event.preventDefault();
    this.authService.getUserDetails(username, password);
    
    
    //   this.toastr.info("User loged in sucessfully", "Info");
    //   this.authService.setLogedInUsername(data);
    //   this.router.navigate(['/events']);
    // },error => {
    //   console.log(error)
    //   this.toastr.error(error.toString(), "Error");

    // }
    // );
  }

}
