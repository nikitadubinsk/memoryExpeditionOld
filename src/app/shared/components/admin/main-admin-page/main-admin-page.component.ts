import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/shared/services/question.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-admin-page',
  templateUrl: './main-admin-page.component.html',
  styleUrls: ['./main-admin-page.component.css']
})
export class MainAdminPageComponent implements OnInit {

  allUsers;
  loading;
  error;
  keys;
  sortID = false;
  sortAGE = false;
  sortIdTouch = true;
  sortAgeTouch = true;
  sortIdIndex = 0;
  sortAgeIndex = 0;
  sortIdUp = true;
  sortAgeUp = true;
  lenght = 0;

  constructor(private questionService: QuestionService, private router: Router) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.allUsers = await this.questionService.getAllUsers();
    } catch(e) {
      console.log(e.message)
    }
    this.keys = Object.keys(this.allUsers);
    this.allUsers = Object.values(this.allUsers);
    for (let i=0; i<this.allUsers.length; i++) {
      this.allUsers[i].id = this.keys[i];
    }
    this.loading = false;
  }

  async logout() {
    try {
      await firebase.auth().signOut()
    } catch(e) {
      this.error = true
    }
    if (!this.error) {
      this.router.navigate([''])
      localStorage.clear()
    }
  }

  async deleteUser(user) {
    console.log(user);
  }

  sortId() {
    if (this.sortIdUp) {
      this.allUsers.sort((a, b) => {
        if (a.points > b.points) {return 1}
        if (a.points < b.points) {return -1}
        return 0;
      })
    } else {
      this.allUsers.sort((a, b) => {
        if (a.points < b.points) {return 1}
        if (a.points > b.points) {return -1}
        return 0;
      })
    }
    this.sortIdUp = !this.sortIdUp;
    this.sortID = true;
    this.sortAGE = false;
    if (this.sortIdIndex != 0) {
      this.sortIdTouch = !this.sortIdTouch;
    }
    this.sortIdIndex++;
    this.sortAgeIndex = 0;
  }

  sortAge() {
    if (this.sortAgeUp) {
      this.allUsers.sort((a, b) => {
        if (a.time < b.time) {return 1}
        if (a.time > b.time) {return -1}
        return 0;
      })
    } else {
      this.allUsers.sort((a, b) => {
        if (a.time > b.time) {return 1}
        if (a.time < b.time) {return -1}
        return 0;
      })
    }
    this.sortAgeUp = !this.sortAgeUp;
    this.sortAGE = true;
    this.sortID = false;
    if (this.sortAgeIndex != 0) {
      this.sortAgeTouch = !this.sortAgeTouch;
    }
    this.sortAgeIndex++;
    this.sortIdIndex = 0;
  }

}
