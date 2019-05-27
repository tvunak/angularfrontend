import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../shared/article.model';
import { ArticleDetail } from '../shared/articleDetails.model';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  article:Article;
  articleId:number;
  constructor(private articleService: ArticleService, private route:ActivatedRoute, private shoppingService: ShoppingService) { }

  ngOnInit() {

    this.articleService.getArticleDetails(+this.route.snapshot.params['id']).subscribe((response) => {
      console.log(response);
      this.article = <Article> response;
      let detailString: string = this.article.articleDetail.toString();
      let articleDetail: ArticleDetail = JSON.parse(detailString)
      this.article.articleDetail = articleDetail;
     
    });

  }

  addItem(){

    console.log(this.article);
    this.shoppingService.addArticleToCart(this.article);
  }

}
