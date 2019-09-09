import { Component, OnInit } from '@angular/core';
import { SelfHttp } from 'src/app/common/app.service';
import {apiList} from '../../common/app.api'; 
import { ToastService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  adContent:'';
  constructor(
    public http: SelfHttp, 
    public api: apiList,
    private _toast: ToastService,
  ) { }
  onLeftClick() {
    history.go(-1);
  };
  release(){
    this.http.post(this.api.urlList.pushAdvice.path,{adContent:this.adContent},res=>{
       if(res.code===200){
        this._toast.success('发送成功', 2000)
       }else{
        this._toast.fail('发送失败', 2000)
       }
    })
  }
  ngOnInit() {
  }

}
