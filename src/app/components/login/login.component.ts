import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {ValidateBase} from '../../../ValidatorBase'
import { ToastService } from 'ng-zorro-antd-mobile';
import { HttpHeaders } from '@angular/common/http';
import { selfHttp } from 'src/app/common/app.service';
import {apiList} from '../../common/app.api'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
      /deep/ .my-list .spe .am-list-extra {
        flex-basis: initial;
      }
    `
  ],
  providers:[selfHttp, apiList]
})
export class LoginComponent implements OnInit {
 
  constructor(
    private _toast: ToastService,
    public http: selfHttp, 
    public api: apiList,
    public router:Router
  ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  renderFooter: Function;
  registerForm: FormGroup;
  isError: boolean = false;

  onFocus: object = {
    focus: false
  };

  formErrors: any = {
    username: '',
    password: ''
  };

  formData: any = {
    username: '',
    password: ''
  };

  validationMessage: any = {
    username: {
      // required: '邮箱为空',
      email:'邮箱格式不对'
    },
    password: {
      required: '密码不能为空',
    }
  };
  failToast(msg:string) {
    const toast = this._toast.fail(msg, 2000);
  }
  successToast() {
    const toast = this._toast.success('登陆成功', 2000)
  }
  bindRenderFooter() {
    return (this.formErrors && this.formErrors['username']) || '';
  }
  
  buildForm(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(this.formData.username, [
        // Validators.required,
        // Validators.email
        ValidateBase.email()
       
      ]),
      password: new FormControl(this.formData.password, [
        Validators.required
      ])
    });
    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessage[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '\n';
        }
      }
    }
  }

  beforeSubmit() {
    const form = this.registerForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
        const messages = this.validationMessage[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '\n';
          if (field === 'username') {
            this.onFocus = {
              focus: true
            };
          }
        }
        return false;
      } else {
        return true;
      }
    }
  }

  //登录
  onSubmit() {
    if (this.beforeSubmit()) {
      let email=this.registerForm.value.username;
      let userPwd=this.registerForm.value.password;
      this.http.post(this.api.urlList.userLogin.path, {email: email, userPwd:userPwd}, res => {
        if(res.code===200){
           //保存token
          localStorage.setItem("token", res.token);
          //保存用户信息
          localStorage.setItem("userInfo",JSON.stringify(res.userInfo[0]));
          this.successToast();
          this.router.navigateByUrl('/index');
        }else{
          this.failToast('账号或密码错误');
        }
      }, this.httpOptions);
      // this.onReset();
      
    } else {
      this.failToast('账号或密码格式不对');
    }
  }

  onReset() {
    this.registerForm.reset();
    this.formData = {
      ...{
        username: '',
        password: ''
      }
    };
    this.isError = false;
  }

  inputErrorClick(e) {

    const toast = this._toast.fail('邮箱格式错误', 2000);

  }

  inputChange(e) {
    var regemail = /\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!(regemail.test(e))) {
      this.isError = true;
      this.validationMessage.username.email="邮箱格式不对"
    } else {
      this.isError = false;
    }
    this.formData.username = e;
  };

  ngOnInit() {
    //检测设备
    var url = window.location.pathname;
    var pcurl = "http://localhost:8080" + url
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) == false || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent)) == false) {
      if (window.location.href.indexOf("?mobile") < 0) {
        try {
          if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) == false) {
            window.location.href = pcurl;
          }

        } catch (e) { }
      }
    };
    this.buildForm();
    this.renderFooter = this.bindRenderFooter.bind(this);
  }

}
