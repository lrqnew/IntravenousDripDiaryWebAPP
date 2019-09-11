import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { SelfHttp } from 'src/app/common/app.service';
import {apiList} from '../../common/app.api'; 
import { ToastService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModifyComponent implements OnInit {

  constructor(
    public http: SelfHttp, 
    public api: apiList,
    private _toast: ToastService,
   
  ) { }
  onLeftClick() {
    history.go(-1);
  };
  birthday=new Date (Date.parse(JSON.parse(localStorage.getItem("userInfo")).birthday));
 
  birth=this.birthday.toLocaleDateString();
  userId = JSON.parse(localStorage.getItem("userInfo")).userId;
  asynData =['男','女'];
  name = '选择';
  gender=JSON.parse(localStorage.getItem("userInfo")).sex==1?'男':'女';
  sex = [this.gender];
  
  signs=JSON.parse(localStorage.getItem("userInfo")).signs;
  userName=JSON.parse(localStorage.getItem("userInfo")).userName;
  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }
  onOk(result: Date) {
      this.birthday = result;
      this.birth=result.toLocaleDateString();
  }
  formatIt(date: Date, form: string) {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (form === 'YYYY-MM-DD') {
      return dateStr;
    }
    if (form === 'HH:mm') {
      return timeStr;
    }
    return `${dateStr} ${timeStr}`;
  }
 //性别选择
 onPickerChange(result) {
    this.sex = result;
  } 
  onOk4(result) {
    this.name= this.getResult(result);
  }
  getResult(result) {
    return result;
  }
  //修改
  release(){
    this.http.put(this.api.urlList.updateUser.path,{
      userName: this.userName,
      sex:this.sex[0]=='男'?1:0,
      birthday:this.birth,
      signs:this.signs,
      userId:this.userId
    },res=>{
      if(res.code===200){
        var user= JSON.parse(localStorage.getItem("userInfo"));
        user.userName=this.userName;
        user.sex=this.sex[0]=='男'?1:0;
        localStorage.setItem("userInfo",JSON.stringify(user));
        this._toast.success('修改成功', 2000)
      }else{
        this._toast.fail('修改失败', 2000)
      }
    })
  }
  ngOnInit() {
    this.name= this.sex[0];
  }

}
