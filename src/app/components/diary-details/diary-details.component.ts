import { Component, OnInit } from '@angular/core';
import { selfHttp } from 'src/app/common/app.service';
import { apiList } from '../../common/app.api';
import { Router,ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-diary-details',
  templateUrl: './diary-details.component.html',
  styleUrls: ['./diary-details.component.css'],
  providers: [selfHttp, apiList]
})
export class DiaryDetailsComponent implements OnInit {
  diaryInfo:{};
  constructor(
    public http: selfHttp,
    public api: apiList,
    public router: Router,
    public Active: ActivatedRoute
  ) { }
  onLeftClick() {
    history.go(-1);
  };
  //根据id查询用户日记内容
  userId=JSON.parse(localStorage.getItem("userInfo")).userId;
  diaryDetails() {
    let dId=this.Active.snapshot.params['id'];
    console.log(dId);
    this.http.get(this.api.urlList.diaryDetails.path,{ dId:dId,userId:this.userId},res=>{
      // console.log(res);
      this.diaryInfo=res[0];
      console.log(this.diaryInfo);
    })
  };

  ngOnInit() {
    this.diaryDetails();
  }

}
