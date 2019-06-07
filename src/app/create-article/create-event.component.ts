import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleVerficationService } from '../services/article-verfication.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  inputFile: File;
  constructor(private router: Router, private articleVerification: ArticleVerficationService, private  articleService: ArticleService) { }

  ngOnInit() {
  }

  cancelButton(){
    this.router.navigate(['/events']);
  }

  onSubmit(name: string, price: string, date: string, description: string, manufacturer: string){
    console.log(description);
    console.log(manufacturer);
    let isValidInputData = this.articleVerification.verifyInput(name, price, date, description, manufacturer);
    if (isValidInputData){
      this.articleService.addArticle(name, price, date, description, manufacturer, this.inputFile);
    }
    
  }

  fileChanged(e) {
    this.inputFile = e.target.files[0];
}

}
