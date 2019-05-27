import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {
  username: string;
  email: string;
  
  parentData: any;

  constructor(private dialogRef: MatDialogRef<DeleteUserModalComponent>, @Inject(MAT_DIALOG_DATA) dataFromParent,
              private userService: UserService) {
    this.parentData = dataFromParent;
    this.username = dataFromParent.username;
    this.email = dataFromParent.email;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  delete(){
    
    let observable = this.userService.deleteUser(this.username, this.email);
    observable.subscribe(response =>{
      console.log( response);
      this.userService.deletedUserEmitter.emit(this.parentData);
      this.dialogRef.close();
    });
  }

}
