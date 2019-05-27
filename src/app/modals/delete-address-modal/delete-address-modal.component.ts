import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-delete-address-modal',
  templateUrl: './delete-address-modal.component.html',
  styleUrls: ['./delete-address-modal.component.css']
})
export class DeleteAddressModalComponent implements OnInit {
  parentData: Address;
  constructor(private dialogRef: MatDialogRef<DeleteAddressModalComponent>, @Inject(MAT_DIALOG_DATA) dataFromParent,
              private addressService: AddressService) {
    this.parentData = dataFromParent;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  delete(){
    console.log(this.parentData);
    this.addressService.removeAddress(this.parentData.id).subscribe(response =>{
      console.log(response);
      this.addressService.deletedAddressEmitter.next(this.parentData);
      this.dialogRef.close();
    });
  }

}
