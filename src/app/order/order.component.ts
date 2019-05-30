import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../services/shopping.service';
import { Article } from '../shared/article.model';
import { Address } from '../models/address';
import { AddressService } from '../services/address.service';
import { OrderService } from '../services/order.service';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { AddAddressModalComponent } from '../modals/add-address-modal/add-address-modal.component';
import { User } from '../models/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private articlesInCart: Article[] = [];
  private articlesPriceSum: number= 0;
  addresses: Array<Address> = [];
  billingAddress: Address;
  deliveryAddress: Address;
  checked: boolean = false;

  constructor(private shoppingService: ShoppingService, private addressService: AddressService, 
    private orderService: OrderService, public dialog: MatDialog) { }

  ngOnInit() {
    this.shoppingService.getItemsFromCart().subscribe( response => {
      this.articlesInCart = <Article[]> response.body;
      this.articlesInCart.forEach(article => {
        this.articlesPriceSum = this.articlesPriceSum + article.price;
      });
    });
    let userId = localStorage.getItem('loggedID')
    this.addressService.getAddresses(userId).subscribe(response =>{
      console.log(response.body);
      this.addresses = <Address[]> response.body;
      this.billingAddress =this.addresses[0];
      this.deliveryAddress =this.addresses[0];
    });
    this.addressService.newAddressEmitter.subscribe(address=>{
      this.addresses.push(address);
    });

  }

  onChange(){
    console.log(this.checked);
    this.checked = !this.checked;
  }

  order(){
    this.orderService.createOrder(this.articlesInCart, this.billingAddress, this.deliveryAddress);
  }

addNewAddress(){
  console.log("add address dialog works");
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  let userId: number = +localStorage.getItem('loggedID');
  console.log(userId);
  let user :  User = new User;
  user.id = userId;
  dialogConfig.data = user;
  this.dialog.open(AddAddressModalComponent, dialogConfig)
}

}
