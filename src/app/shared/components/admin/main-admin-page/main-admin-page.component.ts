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
  sortPointsFlag = false;
  sortTimeFlag = false;
  sortPointsTouch = true;
  sortTimeTouch = true;
  sortPointsIndex = 0;
  sortTimeIndex = 0;
  sortPointsUp = true;
  sortTimeUp = true;
  loadingDelete = false;

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
    this.allUsers = this.allUsers.map((el, index) => {
      el['id'] = this.keys[index]
      return el
    })
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
    try {
      this.loadingDelete = true;
      await this.questionService.deleteUser(user);
      let index = this.allUsers.findIndex((el)=>el.id==user.id); 
      this.allUsers.splice(index, 1);
      this.loadingDelete = false;
    } catch(e) {
      console.log(e.message)
    }
  }

  async updateUser() {
    this.loading = true;
    this.sortPointsFlag = false;
    this.sortTimeFlag = false;
    this.sortPointsTouch = true;
    this.sortTimeTouch = true;
    this.sortPointsIndex = 0;
    this.sortTimeIndex = 0;
    this.sortPointsUp = true;
    this.sortTimeUp = true;
    this.allUsers = [];
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

  sortPoints() {
    if (this.sortPointsUp) {
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
    this.sortPointsUp = !this.sortPointsUp;
    this.sortPointsFlag = true;
    this.sortTimeFlag = false;
    if (this.sortPointsIndex != 0) {
      this.sortPointsTouch = !this.sortPointsTouch;
    }
    this.sortPointsIndex++;
    this.sortTimeIndex = 0;
  }

  sortTime() {
    if (this.sortTimeUp) {
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
    this.sortTimeUp = !this.sortTimeUp;
    this.sortTimeFlag = true;
    this.sortPointsFlag = false;
    if (this.sortTimeIndex != 0) {
      this.sortTimeTouch = !this.sortTimeTouch;
    }
    this.sortTimeIndex++;
    this.sortPointsIndex = 0;
  }

}
