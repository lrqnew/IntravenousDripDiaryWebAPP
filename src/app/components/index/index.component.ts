import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

 
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  tabbarStyle: object = { height: '100%' };
  selectedIndex: number = 0;
  //底部按钮选择事件
  tabBarTabOnPress(pressParam: any) {
    console.log('onPress Params: ', pressParam);
    this.selectedIndex = pressParam.index;
  }
}
