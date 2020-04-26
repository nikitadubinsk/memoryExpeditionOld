import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Question } from 'src/app/app.component';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css']
})
export class MainGameComponent implements OnInit {

  @Output() getFullQuestion:EventEmitter<Question> = new EventEmitter<Question>();
  openFullQuestionFlag = false;
  question: Question;

  category1: Question[] = [];
  category2: Question[] = [];
  category3: Question[] = [];
  category4: Question[] = [];
  category5: Question[] = [];
  keys1 = [];
  keys2 = [];
  keys3 = [];
  keys4 = [];
  keys5 = [];
  allQuestion;
  points = 0;
  allID = [];
  loading = false;

  constructor(private questionService: QuestionService, private router: Router) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.allQuestion = await this.questionService.getAllQuestion();
    } catch(e) {
      console.log(e.message)
    }
    this.keys1 = Object.keys(this.allQuestion.category1);
    this.keys2 = Object.keys(this.allQuestion.category2);
    this.keys3 = Object.keys(this.allQuestion.category3);
    this.keys4 = Object.keys(this.allQuestion.category4);
    this.keys5 = Object.keys(this.allQuestion.category5);
    this.category1 = Object.values(this.allQuestion.category1);
    this.category2 = Object.values(this.allQuestion.category2);
    this.category3 = Object.values(this.allQuestion.category3);
    this.category4 = Object.values(this.allQuestion.category4);
    this.category5 = Object.values(this.allQuestion.category5);
    for (let i=0; i<=5; i++) {
      this.category1[i].id = this.keys1[i];  
      this.category2[i].id = this.keys2[i]; 
      this.category3[i].id = this.keys3[i]; 
      this.category4[i].id = this.keys4[i]; 
      this.category5[i].id = this.keys5[i]; 
    }
    this.loading = false;
  }

  allId(allid) {
    this.allID = [...allid];
  }

  openFull(question: Question) {
    this.openFullQuestionFlag = true;
    this.question  =  question;
  }

  plusPoints(p) {
    this.points = this.points + p;
  }

  async close(bool) {
    this.openFullQuestionFlag = !this.openFullQuestionFlag;
    if (this.allID.length == 30) {  
      localStorage['points'] = this.points;
      if (localStorage['day'] < 25 || localStorage['day'] == 25 || (localStorage['day'] == 26 && localStorage['hours']<18)) {
        let user = {
          name: localStorage['name'],
          link: localStorage['link'],
          points: this.points,
          time: localStorage['time']
        }
        try {
          await this.questionService.addUser(user);
        } catch(e) {
          console.log(e.message)
        }
        this.router.navigate(['/finish'])
      } else {
        this.router.navigate(['/delay'])
      }
    }
  }

}
