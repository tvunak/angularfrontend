import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class ArticleVerficationService {

  constructor(private toastr: ToastrService) { }

  verifyInput(name: String, price: String, date: String, description: String, manufacturer: String){
    if (name === ""){
      this.toastr.error("Name cannot be empty");
      return false;
    }else if (price === ""){
      this.toastr.error("Price cannot be empty");
      return false;
    }else if (date === ""){
      this.toastr.error("Date cannot be empty");
      return false;
    }else if (description === ""){
      this.toastr.error("Description cannot be empty");
      return false;
    }else if (manufacturer === ""){
      this.toastr.error("Manufacturer cannot be empty");
      return false;
    }else{
      var priceNumber = Number(price);
      if (isNaN(priceNumber)){
        this.toastr.error("Price must be number");
        return false;
      }
      if(!this.validateDate(date)){
        this.toastr.error("Date is not valid");
        return false;
      }else{
        // console.log("onSubmit from add article");
        // console.log(name);
        // console.log(priceNumber);
        // console.log(date);
        return true;
      }     
    }
  }

  validateDate(date: String){
    var month = null;
    var day = null;
    var year = null;
    var count = (date.match(/\//g) || []).length;
    if(count !== 2){
      //check for / symbol
      this.toastr.error("Inappropriate number of \/");
      return false;
    }
    var res = date.split("/");           
    if (res.length > 1) {
        day = res[0];
        month = res[1];
        year = res[2];
        if (isNaN(month) || isNaN(day) || isNaN(year)){
          //if "parts" are not numbers date is not valid
          this.toastr.error("Day, month or year not valid");
          return false;
        }
        if (month < 1 || month > 12) { 
          // check month range
          this.toastr.error("Month not valid");
          return false;
        }
        if (day < 1 || day > 31) {
          this.toastr.error("Day not valid");
          return false;
        }
        if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
          //verification of months which have 30 days
          this.toastr.error("Day not valid");
          return false;
        }
        if (month == 2) { 
          // check for february 29th
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day > 29 || (day == 29 && !isleap)) {
              this.toastr.error("Day not valid");
              return false;
            }
        }
        return true;
    }
    return false;                              
  }
  
}
