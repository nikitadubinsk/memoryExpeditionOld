import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      link: new FormControl(this.link, [Validators.required]),
      personalData: new FormControl('', [Validators.required, Validators.requiredTrue]),
    });
    
  }

  submit() {
    var date = new Date();
    localStorage['name'] = this.form.value.name;
    localStorage['link'] = this.form.value.link;
    localStorage['day'] = this.date.getDate();
    localStorage['hours'] = this.date.getHours();
    localStorage['time'] = this.date;
    if (localStorage['day'] < 25 || localStorage['day'] == 25 || (localStorage['day'] == 26 && localStorage['hours']<18)) {
      console.log("Данные отправляются на сервер")
    } else {
      console.log("Данные НЕ отправляются на сервер")
    }
    this.router.navigate(['/game'])
  }

}
