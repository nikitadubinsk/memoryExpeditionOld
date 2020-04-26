import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-later-page',
  templateUrl: './later-page.component.html',
  styleUrls: ['./later-page.component.css']
})
export class LaterPageComponent implements OnInit {

  points;

  constructor() { }

  ngOnInit() {
    this.points = localStorage['points'];
  }

}
