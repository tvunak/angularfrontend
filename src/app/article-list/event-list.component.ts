import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

import { Article } from '../shared/article.model';


@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  articleList: Array<Article> = [];
  articleListIDs: Array<Number>= [];

  constructor(private articleService: ArticleService) {
    
   }

  ngOnInit() {
    if(this.articleService.getArticlIds.length ==0){
      this.articleService.getArticles().subscribe((response) => {
        console.log(response);
        this.articleList = <Article[]> response;
        this.articleList.forEach(article => {
          this.articleListIDs.push(article.id);
        });
        this.articleService.setArticlIds(this.articleListIDs);
      });  
    }      
    
  }


}
