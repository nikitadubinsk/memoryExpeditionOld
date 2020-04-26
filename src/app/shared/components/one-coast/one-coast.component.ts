import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/app.component';

@Component({
  selector: 'app-one-coast',
  templateUrl: './one-coast.component.html',
  styleUrls: ['./one-coast.component.css']
})
export class OneCoastComponent implements OnInit {

  @Input() question : Question;
  @Input() allId;
  @Output() openFullQuestion:EventEmitter<Question> = new EventEmitter<Question>();
  @Output() onAllId:EventEmitter<any> = new EventEmitter<any>();
  flag = false;
  was;

  constructor() { }

  ngOnInit() {
    for (let i=0; i<this.allId.length; i++) {
      if (this.allId[i] == this.question.id) {
        this.flag = true;
      }
    }
  }

  openFull(question: Question) {
    for (let i=0; i<this.allId.length; i++) {
      if (this.allId[i] == question.id) {
        this.flag = true;
      }
    }
    this.allId.push(question.id)
    if (!this.flag) {
      this.openFullQuestion.emit(question);
      this.onAllId.emit(this.allId);
    }
  }

}
