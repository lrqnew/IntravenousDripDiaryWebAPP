import { Component, OnInit } from '@angular/core';
import { SelfHttp } from 'src/app/common/app.service';
import {apiList} from '../../common/app.api'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],

})
export class IndexComponent implements OnInit {
  
  // dtPullToRefreshStyle = { height: this.state.height + 'px' };
  constructor(
    public http: SelfHttp, 
    public api: apiList,
    public router:Router
  ) { 

  }
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  tabbarStyle: object = { height: '100%' };
  selectedIndex: number = 0;
  isLookDiary=true;
  iswriteDiary=false;
  isUserCenter=false;
  //日记信息
  diaryInfo:{
     diaryYear:'',
     diaryMonth:'',
     diaryDay:''
  }
  //底部按钮选择事件
  tabBarTabOnPress(pressParam: any) {
    if(pressParam.index===0){
      this.isLookDiary=true;
      this.iswriteDiary=false;
      this.isUserCenter=false;
      this.router.navigateByUrl('/index/lookDiary');
    }
    if(pressParam.index===1){

      this.isLookDiary=false;
      this.iswriteDiary=true;
      this.isUserCenter=false;
      this.router.navigateByUrl('/index/writeDiary');
    }
    if(pressParam.index===2){
     
      this.isLookDiary=false;
      this.iswriteDiary=false;
      this.isUserCenter=true;
      this.router.navigateByUrl('/index/userCenter');
    }
    this.selectedIndex = pressParam.index;
  }

  ngOnInit() {
     this.router.navigateByUrl('/index/lookDiary');
    // this.addItems(0);
 
  }
  
}
