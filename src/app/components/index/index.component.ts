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
  isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
  pageLimit = 10;
  page = 0;
  state = {
    refreshState: {
      currentState: 'deactivate',
      drag: false
    },
    direction: 'up',
    endReachedRefresh: false,
    height: 500,
    data:null,
  };
  // dtPullToRefreshStyle = { height: this.state.height + 'px' };
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
  //日记信息
  diaryInfo:{
     diaryYear:'',
     diaryMonth:'',
     diaryDay:''
  }
  //底部按钮选择事件
  tabBarTabOnPress(pressParam: any) {
    console.log('onPress Params: ', pressParam);
    this.selectedIndex = pressParam.index;
  }
  //查询日记列表
  selectDiary(pageSize){
    this.http.get(this.api.urlList.selectDiary.path,{
      pno:this.page,
      pageSize: pageSize,
      userId: this.userId,
     },res=>{
      console.log(res);
      this.state.data=res.data;
      console.log(this.state.data);
    })
  };
  //下拉刷新
pullToRefresh(event) {

  if (event === 'endReachedRefresh') {

    if (this.page < 9) {
      this.page++;
      this.addItems(this.page * this.pageLimit);
      this.state.refreshState.currentState = 'release';
      setTimeout(() => {
        this.state.refreshState.currentState = 'finish';
      }, 1000);
    }
  } else {
    if (event === 'down') {
      this.state.data = [];
      this.page = 0;
      // this.addItems(11);
    } else {
      if (this.page < 9) {
        console.log(this.page);
        this.selectDiary(this.page * this.pageLimit);
      }
    }
  }
}

addItems(startIndex) {
  for (let i = startIndex; i < this.pageLimit * (this.page + 1); i++) {
    this.state.data.push(i);
  }
}

genData() {
  const dataArr = [];
  for (let i = 0; i < 100; i++) {
    dataArr.push(i);
  }
  return dataArr;
}
  ngOnInit() {
    this.selectDiary(10);
    // this.addItems(0);
  }
}
