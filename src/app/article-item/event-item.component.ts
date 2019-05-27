import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../shared/article.model'


@Component({
  selector: 'event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  
@Input() articleChild: Article[];
@Output() eventClick = new EventEmitter();


  constructor() {
   }


  ngOnInit() {
  }

  


}
