import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  form : FormGroup;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.minLength(1)]),
      category: new FormControl('', [Validators.required, Validators.minLength(1)]),
      cost: new FormControl('', [Validators.required, Validators.minLength(1)]),
      answer1: new FormControl('', [Validators.required, Validators.minLength(1)]),
      answer2: new FormControl('', [Validators.required, Validators.minLength(1)]),
      answer3: new FormControl('', [Validators.required, Validators.minLength(1)]),
      correctAnswer: new FormControl('', [Validators.required, Validators.minLength(1)]),
      URLVideo: new FormControl('', []),
      URLPicture: new FormControl('', []),
      details: new FormControl('', []),
    });
  }

  async submit() {
    console.log(this.form.value);
    try {
      await this.questionService.addQuestion(this.form.value)
    } catch(e) {
      console.log(e.message);
    }
  }

}
