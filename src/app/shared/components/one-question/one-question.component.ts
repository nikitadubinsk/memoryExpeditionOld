import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/app.component';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-one-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css'],
  animations: [
    trigger('continueButton', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000)
      ])
    ])
  ]
})
export class OneQuestionComponent implements OnInit {

  chooseAnAnswerFlag = [];
  answerTrueFlag = [];
  answerFalseFlag = [];
  points = 0;
  continueFlag = false;
  wasClick = false;

  @Input() question: Question;
  @Output() onPoints: EventEmitter<number> = new EventEmitter<number>()
  @Output() onFlag: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(public sanitizer:DomSanitizer) { }

  ngOnInit() {
    for (let i=1; i<=4; i++) {
      this.chooseAnAnswerFlag[i] = false;
      this.answerTrueFlag[i] = false;
      this.answerFalseFlag[i] = false;
    }
  }

  VideoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.question.URLVideo);
  }

  PictureUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.question.URLPicture);
  }

  chooseAnAnswer(ans) {
    if (!this.wasClick) {
      this.wasClick = true;
      this.chooseAnAnswerFlag[ans] = true;
      setTimeout(() => {
        if (ans == this.question.correctAnswer) {
          this.chooseAnAnswerFlag[ans] = false;
          this.answerTrueFlag[ans] = true;
          this.points = this.question.cost;
        } else {
          this.answerTrueFlag[this.question.correctAnswer] = true;
          this.answerFalseFlag[ans] = true;
          this.chooseAnAnswerFlag[ans] = false;
        }
        this.continueFlag = true;
      }, 1000)
    }
  }

  continue() {
    this.onPoints.emit(this.points);
    this.onFlag.emit(false);
  }

}
