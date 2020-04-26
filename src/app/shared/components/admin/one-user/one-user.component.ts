import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.css']
})
export class OneUserComponent implements OnInit {

  @Input() user;
  @Input() idx;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
  }

  deleteUser() {
    this.onDelete.emit(this.user);
  }

}
