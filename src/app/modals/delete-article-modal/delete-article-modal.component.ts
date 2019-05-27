import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-delete-article-modal',
  templateUrl: './delete-article-modal.component.html',
  styleUrls: ['./delete-article-modal.component.css']
})
export class DeleteArticleModalComponent implements OnInit {
  articleName: string;
  parentData: any;

  constructor(private dialogRef: MatDialogRef<DeleteArticleModalComponent>, @Inject(MAT_DIALOG_DATA) dataFromParent,
  private articleService: ArticleService) { 
    this.parentData = dataFromParent;
    this.articleName = dataFromParent.name;
  }
  

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

  delete(){
    let observable = this.articleService.deleteArticle(this.parentData);
    observable.subscribe(response =>{
      console.log("article modal deleted");
      this.articleService.deletedArticleEmitter.emit(this.parentData);
      this.dialogRef.close();
    });
  }
}
