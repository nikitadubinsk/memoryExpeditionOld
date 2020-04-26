import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  addQuestion(question: Question) {
    return this.http.post(`https://myowngame-95366.firebaseio.com/questions/${question.category}.json`, question).toPromise()
  }

  getAllQuestion() {
    return this.http.get(`https://myowngame-95366.firebaseio.com/questions.json`).toPromise()
  }

  addUser(user) {
    return this.http.post(`https://myowngame-95366.firebaseio.com/users.json`, user).toPromise()
  }

  getAllUsers() {
    return this.http.get(`https://myowngame-95366.firebaseio.com/users.json`).toPromise()
  }

  deleteUser(user) {
    return this.http.delete(`https://myowngame-95366.firebaseio.com/users/${user}.json`).toPromise()
  }
  
}
