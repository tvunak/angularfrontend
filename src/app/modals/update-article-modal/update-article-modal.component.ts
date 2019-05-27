import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/shared/article.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-update-article-modal',
  templateUrl: './update-article-modal.component.html',
  styleUrls: ['./update-article-modal.component.css']
})
export class UpdateArticleModalComponent implements OnInit {

  parentData: Article;

  constructor(private dialogRef: MatDialogRef<UpdateArticleModalComponent>, @Inject(MAT_DIALOG_DATA) dataFromParent, private articleService: ArticleService){
    this.parentData = dataFromParent;
  }

  ngOnInit() {
  }

  save(){
    console.log(this.parentData);
    if(this.parentData.name != "" && this.parentData.date != null && this.parentData.time != "" && this.parentData.name != ""){

      this.articleService.updateArticle(this.parentData).subscribe(response =>{
        console.log(response);
        this.dialogRef.close();
      });

    }
  }
  close(){
    this.dialogRef.close();
  }


}
