import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { IUserDetails } from 'src/app/shared/userDetails.model';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css']
})
export class UpdateUserModalComponent implements OnInit {
  inpUsername: string;
  inpEmail: string;

  parentData: IUserDetails;

  constructor(private dialogRef: MatDialogRef<UpdateUserModalComponent>, @Inject(MAT_DIALOG_DATA) dataFromParent, private userService: UserService){
    this.parentData = dataFromParent;
    this.inpUsername = dataFromParent.username;
    this.inpEmail = dataFromParent.email;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    console.log(this.inpUsername);
    if(this.inpUsername != "")
      this.parentData.username = this.inpUsername;
    if(this.inpEmail != "")
      this.parentData.email = this.inpEmail;
    console.log(this.parentData);
    this.userService.updateUser(this.parentData).subscribe(response =>{
      console.log(response);
      this.dialogRef.close();
    });
  }

}
