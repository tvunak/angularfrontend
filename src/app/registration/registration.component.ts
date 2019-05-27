import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  inpUsername: string;
  inpEmail: string;
  inpPassword: string;
  inpName: string;


  constructor(private registrationService: RegistrationService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(username: string, email: string, password: string, name: string, middleName: string, lastName: string ){
    var  validUsername:boolean = false;
    var  validEmail:boolean;
    var  validPassword:boolean = false;
    var  validName:boolean = false;
    var  validLastName:boolean = false;
  
    if (username.length>3)
      validName = true;

    if (name.length>2)
      validUsername = true;

    if (lastName.length>2)
      validLastName = true;

    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    validEmail = regexp.test(email);

    if(password.length>3)
      validPassword=true;
    
    if(validUsername && validEmail && validPassword && validName && validLastName){
      this.registrationService.sendRegistration(username, email, password, name, middleName, lastName).subscribe(response=> {
        console.log(response);
        this.toastr.info("Registration was sucessfull")
      
      },error => {
        this.toastr.error(error.error, "Error");
      }
      );
    }else{
      if(!validUsername){
        this.toastr.error('Username must contain at least 4 characters', 'Error', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
      }else if(!validEmail){
        this.toastr.error('Entered email is not in correct format', 'Error', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
      }else if(!validPassword){
        this.toastr.error('Password must contain at least 5 characters', 'Error', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
      }else if(!validPassword){
        this.toastr.error('Name must contain at least 3 characters', 'Error', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
      }else if(!validPassword){
        this.toastr.error('MiddleName must contain at least 3 characters', 'Error', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
      }else if(!validPassword){
        this.toastr.error('LastName must contain at least 3 characters', 'Error', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
      }

    }
  
  }

}
