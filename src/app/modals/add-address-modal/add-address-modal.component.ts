import { Component, OnInit, Inject } from '@angular/core';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.css']
})
export class AddAddressModalComponent implements OnInit {
  address: Address = new Address();
  dataFromParent: User;

  constructor(private dialogRef: MatDialogRef<AddAddressModalComponent>, private addressService: AddressService,
    @Inject(MAT_DIALOG_DATA) dataFromParent,
  ) { 
    this.dataFromParent = dataFromParent;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }
  save(){
    this.address.user = this.dataFromParent.id;
    console.log(this.address);
    this.addressService.addAddress(this.address).subscribe(response =>{
      var backendAddress = response.body;
      this.addressService.newAddressEmitter.next(backendAddress);
      this.dialogRef.close();
    })
  }

}
