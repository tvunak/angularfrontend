import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { IUserDetails } from '../shared/userDetails.model';
import { MatTableDataSource, MatDialog, MatDialogConfig, MatSort } from '@angular/material';
import { DeleteUserModalComponent } from '../modals/delete-user-modal-component/delete-user-modal.component';
import { UserService } from '../services/user.service';
import { UpdateUserModalComponent } from '../modals/update-user-modal/update-user-modal.component';



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit {
  userAccounts: IUserDetails[];
  subject: any;
  userDataSource: any;
  displayedColumns: string[] = ['email', 'username', 'name', 'lastName', 'edit','delete'];
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private adminService: AdminService, public dialog: MatDialog, private userService: UserService) {
    this.subject = this.adminService.getUsersSubject();
  }
  

  ngOnInit() {
    
    this.adminService.getAllUsers();
    this.subject.subscribe(data =>{
      //console.log(data);
      this.userAccounts = data;
      //console.log(this.userAccounts);
      this.userDataSource = new MatTableDataSource(this.userAccounts);
      this.userDataSource.sort = this.sort;
      //console.log(this.userDataSource);
    });
  }

  //triggered when delete icon clicked
  onDeleteClicked(data: any){
    this.openDeleteDialog(data)
  }

  // used for creating modal dialog
  openDeleteDialog(userData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = userData;
    this.dialog.open(DeleteUserModalComponent, dialogConfig)
    this.userService.deletedUserEmitter.subscribe(data => this.removeUserFromTable(data))
  }

  removeUserFromTable(userData){
    const index = this.userDataSource.data.indexOf(userData);
    console.log("user index is: ");
    console.log(index);
    this.userAccounts.splice(index, 1);
    this.userDataSource = new MatTableDataSource(this.userAccounts);
  }

  onEditClicked(data: any){
    console.log("user");
    console.log(data);
    this.openEditDialog(data);
  }

  openEditDialog(userData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = userData;
    this.dialog.open(UpdateUserModalComponent, dialogConfig)
  }

}
