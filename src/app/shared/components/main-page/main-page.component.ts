import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  form : FormGroup;
  name;
  link;
  personalData = false;
  date = new Date();

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      link: new FormControl(this.link, [Validators.required]),
      personalData: new FormControl('', [Validators.required, Validators.requiredTrue]),
    });
    
  }

  submit() {
    localStorage['name'] = this.form.value.name;
    localStorage['link'] = this.form.value.link;
    localStorage['day'] = this.date.getDate();
    localStorage['hours'] = this.date.getHours();
    localStorage['time'] = this.date;
    this.form = new FormGroup({});
    this.router.navigate(['/game'])
  }

}
