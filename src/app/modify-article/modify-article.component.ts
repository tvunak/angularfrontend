import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../shared/article.model';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog} from '@angular/material';
import { DeleteArticleModalComponent } from '../modals/delete-article-modal/delete-article-modal.component';
import { UpdateArticleModalComponent } from '../modals/update-article-modal/update-article-modal.component';


@Component({
  selector: 'app-modify-article',
  templateUrl: './modify-article.component.html',
  styleUrls: ['./modify-article.component.css']
})
export class ModifyArticleComponent implements OnInit {
  articleList: Article[];
  articleDataSource: any;
  displayColumns: string[] =['name', 'date', 'time','price','edit', 'delete'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(response =>{
      this.articleList = response;
      this.articleDataSource = new MatTableDataSource(this.articleList);
      console.log(this.articleList);
      this.articleDataSource.sort = this.sort;
      this.articleDataSource.paginator = this.paginator;
    });
    
  }

  onEditClicked(article: Article){
    console.log("edit");
    console.log(article.name);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = article;
    this.dialog.open(UpdateArticleModalComponent, dialogConfig);
  }

  onDeleteClicked(article: Article){
    console.log("delete");
    console.log(article.name);
    console.log(article);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = article;
    this.dialog.open(DeleteArticleModalComponent, dialogConfig);
    this.articleService.deletedArticleEmitter.subscribe(data => this.removeArticleFromTable(data))
  }
  removeArticleFromTable(articleData: any) {
    const index = this.articleDataSource.data.indexOf(articleData);
    console.log("user index is: ");
    console.log(index);
    this.articleList.splice(index, 1);
    this.articleDataSource = new MatTableDataSource(this.articleList);
  }

}
