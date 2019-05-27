import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/article.model';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private articlesInCart: Article[] = [];
  private articlesPriceSum: number= 0;

  constructor(private shoppingService: ShoppingService) {
    
  }

  ngOnInit() {
    
    let userId = localStorage.getItem('loggedID');
    if (userId != null){
      let subscription = this.shoppingService.getItemsFromCart().subscribe(response =>{
        let articlesInBasket: Article[] = <Article[]> response.body;
        articlesInBasket.forEach(article => {
          this.articlesInCart.push(article);
          this.articlesPriceSum = this.articlesPriceSum +article.price;
        });
      });
      console.log(this.articlesInCart);
    }else{
      this.shoppingService.shoppingCartSubject.subscribe(response =>{
        if (response != null){
          console.log(response);
          this.articlesInCart = response;
          this.articlesInCart.forEach(article =>{
            this.articlesPriceSum = this.articlesPriceSum + article.price;
          });
        }
        
      });
    }
    
  }

  removeItemClick(article: Article){
    console.log("remove item from cart clicked");
    console.log(article);
    let userId = localStorage.getItem('loggedID');
    if (userId != null){
      this.shoppingService.removeItemFromCart(article).subscribe(response =>{
        let index = this.articlesInCart.indexOf(article);
        this.articlesInCart.splice(index, 1);
        this.articlesPriceSum = this.articlesPriceSum - article.price;
      });
    }else{
      let index = this.articlesInCart.indexOf(article);
      this.articlesInCart.splice(index, 1);
      this.articlesPriceSum = this.articlesPriceSum - article.price;
    }
    
  }
  buy(){
    console.log("buy button works");
  }


}
