import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-update-address-modal',
  templateUrl: './update-address-modal.component.html',
  styleUrls: ['./update-address-modal.component.css']
})
export class UpdateAddressModalComponent implements OnInit {

  parentData: Address;

  constructor(private dialogRef: MatDialogRef<UpdateAddressModalComponent>, @Inject(MAT_DIALOG_DATA) dataFromParent,
  private addressService: AddressService) { 
    this.parentData = dataFromParent;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    console.log("here update would be implemented");
    console.log(this.parentData);
    this.addressService.updateAddress(this.parentData).subscribe(response => {
      console.log(response.body);
      this.addressService.updateAddressEmitter.next(response.body);
    });
  }

}
