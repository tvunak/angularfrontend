import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { UpdateUserModalComponent } from '../modals/update-user-modal/update-user-modal.component';
import { DeleteAddressModalComponent } from '../modals/delete-address-modal/delete-address-modal.component';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address';
import { AddAddressModalComponent } from '../modals/add-address-modal/add-address-modal.component';
import { UpdateAddressModalComponent } from '../modals/update-address-modal/update-address-modal.component';


@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {

  user: User;
  addresses: Array<Address> = [];
  selectedAddress: Address;


  constructor(private userService: UserService, public dialog: MatDialog, private addressService: AddressService) { }

  ngOnInit() {
    this.userService.getUserDetails().subscribe(response =>{
      this.user = response.body;
      console.log(this.user);

      this.addressService.getAddresses(this.user.id).subscribe(response =>{
        console.log(response.body);
        this.addresses = <Address[]> response.body;
        this.selectedAddress =this.addresses[0];
      });
    });

    //used for removing address from list addresses
    this.addressService.deletedAddressEmitter.subscribe(response =>{
      let index = this.addresses.indexOf(response);
      this.addresses.splice(index, 1);
      this.selectedAddress =this.addresses[0];
    });

     //used for adding address from list addresses
    this.addressService.newAddressEmitter.subscribe(response =>{
      this.addresses.push(response);
      this.selectedAddress =this.addresses[0];
    });

    //used for updating address from list addresses
    this.addressService.newAddressEmitter.subscribe(response =>{
      
    });

    
  }

  openModifyUserDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.user;
    this.dialog.open(UpdateUserModalComponent, dialogConfig)
  }

  openDeleteAddressDialog(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedAddress;
    this.dialog.open(DeleteAddressModalComponent, dialogConfig)
  }

  openAddAddressDialog(){
    console.log("add address dialog works");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.user;
    this.dialog.open(AddAddressModalComponent, dialogConfig)
  }
  openUpdateAddressDialog(){
    console.log("update address dialog works");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedAddress;
    this.dialog.open(UpdateAddressModalComponent, dialogConfig)
  }



}
