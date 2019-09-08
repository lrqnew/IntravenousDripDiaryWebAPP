import { Component, OnInit } from '@angular/core';
import { selfHttp } from 'src/app/common/app.service';
import { apiList } from '../../common/app.api';
import { ToastService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'app-write-diary',
  templateUrl: './write-diary.component.html',
  styleUrls: ['./write-diary.component.css'],
  providers: [selfHttp, apiList]
})
export class WriteDiaryComponent implements OnInit {
  dTitle = '';
  dContent = '';
  userId = JSON.parse(localStorage.getItem("userInfo")).userId;
  privacy = 0;
  constructor(
    public http: selfHttp,
    public api: apiList,
    private _toast: ToastService,
  ) { }
  switchCheck(e) {
    if (e) {
      this.privacy = 1;
    } else {
      this.privacy = 0;
    }
    console.log(e);
    console.log(this.dTitle);
    console.log(this.dContent);
  }
  inputChange(e) {
    console.log(e);
  };
  //发布日记
  release() {
    this.http.post(this.api.urlList.writeDiary.path, {
      dContent: this.dContent, 
      dTitle: this.dTitle, //日记标题
      dTag: [], //日记标签
      privacy: this.privacy,
      userId: this.userId
    },res=>{
      if(res.code===200){
        this._toast.success('发布成功', 2000)
      }if(res.code===201){
        this._toast.fail('今天已经写过日记了', 2000)
      }else{
        this._toast.fail('发布失败', 2000)
      }
    })
  }

  ngOnInit() {
  }

}
