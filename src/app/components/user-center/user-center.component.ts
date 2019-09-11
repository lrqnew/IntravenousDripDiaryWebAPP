import { Component, OnInit } from '@angular/core';
import { SelfHttp } from 'src/app/common/app.service';
import { apiList } from '../../common/app.api';
import { Router } from '@angular/router';
import { ActionSheetService, ToastService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css'],

 
 
})
export class UserCenterComponent implements OnInit {

  constructor(
    public http: SelfHttp,
    public api: apiList,
    public router: Router,

  ) {
   
   }
  avatar = this.api.baseurl + "/images/" + JSON.parse(localStorage.getItem("userInfo")).avatar;
  userName = JSON.parse(localStorage.getItem("userInfo")).userName;
  userId: number = JSON.parse(localStorage.getItem("userInfo")).userId;
  totalInfo:any= {
    charCount:0,
    diaryCount:0,
    tagsCount:0,
    regTime:0
  }
  //查询统计信息
  totalDinfo() {
    this.http
      .get(this.api.urlList.totalDinfo.path, { userId: this.userId }, res => {
          var tags = [];
          if (res.data) {
            res.data.forEach((element, index) => {
              tags.push(...element.dTag.split(","));
            });
          }
          //计算注册时间
          var regTime = JSON.parse(localStorage.getItem("userInfo")).regTime;
          var startDate = Date.parse(regTime);
          var nowTime = new Date().toLocaleDateString();
          var endDate = Date.parse(nowTime);
          var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
          this.totalInfo.charCount = res.charCount == null ? 0 : res.charCount;
          this.totalInfo.diaryCount =res.charCount == null ? 0 :  res.diaryCount;
          this.totalInfo.tagsCount = tags.length;
          this.totalInfo.regTime = days;
        })
  };
  // "什么是点滴日记？它是一个专门用来记录个人日记的网络应用。TA能做什么？TA帮你记录每天的成长历程；善用TA，TA就是你记忆的一部分。TA不能做什么？TA除了帮你记录写日记，什么都做不了。我为什么要用TA? TA简单易用，永久免费；如果你想为自己的过去留下一些内容的话，也许TA很适合你。"
  exited(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
 
  
  ngOnInit() {
    this.totalDinfo();
  }
  
}
