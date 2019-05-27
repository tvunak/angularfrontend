import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ArticleService } from './article.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Article } from '../shared/article.model';

@Injectable()
export class ArticleRouteGardService implements CanActivate{
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  article: Article;
  private articleExists: boolean = false;

  

  constructor(private articleService: ArticleService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot){
    // console.log(route.params['id']);
    // return true;
    let articalIdList: Number[] = this.articleService.getArticlIds();
    articalIdList.forEach(element => {
      
      if (element == route.params['id']){
        console.log(element);
        this.articleExists = true;
      }
    });
    if (!this.articleExists)
      this.router.navigate(['/404']);
    return this.articleExists;
  }
     
}
