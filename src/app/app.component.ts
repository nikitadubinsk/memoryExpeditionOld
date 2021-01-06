import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as firebase from "firebase/app";
import "firebase/auth";
import { slideInAnimation } from './animations';

export interface Question {
  text?: string,
  category?: string,
  cost?: number,
  answer1?: string,
  answer2?: string,
  answer3?: string,
  correctAnswer?: string,
  id?: string,
  URLVideo?: string,
  URLPicture?: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  firebaseConfig = {
    apiKey: "AIzaSyC0O6ZJektuxi-lIWesPM35dteIgRfVnUs",
    authDomain: "myowngame-95366.firebaseapp.com",
    databaseURL: "https://myowngame-95366.firebaseio.com",
    projectId: "myowngame-95366",
    storageBucket: "myowngame-95366.appspot.com",
    messagingSenderId: "808445640490",
    appId: "1:808445640490:web:01991c9091b1d24acc2853"
  };

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngOnInit() {
    firebase.initializeApp(this.firebaseConfig); 
  }

}
