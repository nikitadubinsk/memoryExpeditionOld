import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Question } from 'src/app/app.component';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
  animations: [
    trigger('popup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.2)' }),
        animate(100)
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(250, style({
          opacity: 0,
          transform: 'scale(1.2)'
        }))
      ]),
    ])
  ]
})
export class MainGameComponent implements OnInit {

  @Output() getFullQuestion:EventEmitter<Question> = new EventEmitter<Question>();
  openFullQuestionFlag = false;
  openPopapFinishGameFlag = false;
  question: Question;
  questions = []
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
    this.questions = Object.values(this.allQuestion);
    this.questions = this.questions.map((el) => {
      let value = Object.values(el);
      let id = Object.keys(el);
      value = value.map((element, index) => {
        element['id'] = id[index];
        return element;
      }) 
      return value;
    })
    this.questions = this.questions.reduce((r, a) => r.concat(a), []);
    this.questions.sort((a, b) => {
        if (a.cost > b.cost) {return 1}
        if (a.cost < b.cost) {return -1}
        return 0;
      })
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
    this.points += p;
  }

  openPopupFinishGame() {
    this.openPopapFinishGameFlag = true;
  }

  closePopapFinishGame() {
    this.openPopapFinishGameFlag = false;
  }

  async finishGame() {
    localStorage['points'] = this.points;
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
  }

  async close(bool) {
    this.openFullQuestionFlag = !this.openFullQuestionFlag;
    if (this.allID.length == 30) {  
      this.finishGame();
      } 
  }

}
