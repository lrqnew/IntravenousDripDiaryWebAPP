import { Component, OnInit } from '@angular/core';
import { selfHttp } from 'src/app/common/app.service';
import {apiList} from '../../common/app.api'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[selfHttp, apiList]
})
export class IndexComponent implements OnInit {

  constructor(
    public http: selfHttp, 
    public api: apiList,
    public router:Router
  ) { 

  }

  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  tabbarStyle: object = { height: '100%' };
  selectedIndex: number = 0;
  userId:number=JSON.parse(localStorage.getItem("userInfo")).userId;
  diaryQuery:object= {
    pno: 0,
    pageSize: 5,
    // userId: JSON.parse(localStorage.getItem("userInfo")).userId,
    pageSizeOpts: [5, 10, 15]
  };
  //底部按钮选择事件
  tabBarTabOnPress(pressParam: any) {
    console.log('onPress Params: ', pressParam);
    this.selectedIndex = pressParam.index;
  }
  //查询日记列表
  selectDiary(){
    this.http.get(this.api.urlList.selectDiary.path,{
      userId: JSON.parse(localStorage.getItem("userInfo")).userId,
     },res=>{
      console.log(res);
    })
  };
  
  ngOnInit() {
    this.selectDiary();
  }
}
