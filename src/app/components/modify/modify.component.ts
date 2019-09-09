import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  constructor() { }
  onLeftClick() {
    history.go(-1);
  };
  ngOnInit() {
  }

}
