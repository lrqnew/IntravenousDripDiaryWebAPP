import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidateBase } from '../../../ValidatorBase';
import { SelfHttp } from 'src/app/common/app.service';
import {apiList} from '../../common/app.api'; 
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
  styles: [
    `
      /deep/ .my-list .spe .am-list-extra {
        flex-basis: initial;
      }
    `
  ],

})
export class RegComponent implements OnInit {

  constructor(
    private _toast: ToastService,
    public http: SelfHttp, 
    public api: apiList,
  ) { }
  isError: boolean = false;
  pwdError: boolean = false;
  rpwdError:boolean=false;
  renderFooter: Function;
  registerForm: FormGroup;
  formData: any = {
    username: '',
    password: '',
    repwd: ''
  };
  validationMessage: any = {
    username: {
      // required: '邮箱为空',
      email: '邮箱格式不对'
    },
    password: { pwd: '密码至少5位' },
    repwd:{
      required: '密码不能为空',
      repwd:'两次密码不一致'
    }
  };
  formErrors: any = {
    username: '',
    password: '',
    repwd: ''
  };
  onFocus: object = {
    focus: false
  };
  inputErrorClick(e) {
    if(this.isEmail){
      const toast = this._toast.fail('此邮箱已经注册,请登录', 2000);
    }else{
      const toast = this._toast.fail('邮箱格式错误', 2000);
    }
      
  };
  inputPwdErrorClick(e) {
    const toast = this._toast.fail('密码至少5位', 2000);
  };
  inputRpwdErrorClick(e) {
    const toast = this._toast.fail('两次密码不一致', 2000);
  };
  inputChange(e) {
    var regemail = /\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!(regemail.test(e))) {
      this.isError = true;
      this.validationMessage.username.email = "邮箱格式不对"
    } else {
      this.isError = false;
      this.isEmail=false;
    }
    this.formData.username = e;
  };
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
  buildForm(): void {
    this.registerForm = new FormGroup({
      password: new FormControl(this.formData.password, [
        ValidateBase.maxLength()
      ]),
      username: new FormControl(this.formData.username, [
        // Validators.required,
        // Validators.email
        ValidateBase.email()
      ]),
      repwd: new FormControl(this.formData.repwd, [
        ValidateBase.rePwd(),
        Validators.required,
      ])
    });
    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  };
  bindRenderFooter() {
    return (this.formErrors && this.formErrors['username']) || (this.formErrors && this.formErrors['password']) || (this.formErrors && this.formErrors['repwd'])||'';
  };
  beforeSubmit() {
    var flag:boolean;
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
          if (field === 'password') {
            this.onFocus = {
              focus: true
            };
          }
          
        }
        return false;
      }
      else {
        flag = true;
      }
    }
    console.log(flag);
    return flag;
  };
  
  //验证密码
  inputPwdChange(e) {
    if (e.replace(/\s/g, '').length < 5 && e.replace(/\s/g, '').length > 0) {
      this.pwdError = true;
      this.validationMessage.password.pwd = "密码至少5位"
    } else {
      this.pwdError = false;
    }
    this.formData.password = e;
    this.inputRpwdChange();
  };
  //验证两次密码是否一致
  inputRpwdChange(e?) {
    console.log(e);
    if (e!==this.formData.password||e===undefined) {
      this.rpwdError = true;
      this.validationMessage.repwd.repwd = "两次密码不一致"
    } else {
      this.rpwdError = false;
    }
    this.formData.repwd = e;
  };
  //检查邮箱是否已经注册
  isEmail=false;
  checkEmail(e){
    this.http.get(this.api.urlList.selectMail.path,{email:e},res=>{
      if(res.code===402){
        this.isError = true;
        this.isEmail=true;
        this._toast.fail('此邮箱已经注册,请登录', 2000);
      }
    })
  };
//注册
onSubmit() {
  if(this.isEmail){
    this._toast.fail('此邮箱已经注册,请登录', 2000);
  }
  if (this.beforeSubmit()&&!this.isEmail) {
     this.http.post(this.api.urlList.userReg.path,{email:this.formData.username,userPwd:this.formData.password},res=>{
       if(res.code===200){
        this._toast.success('注册成功,请登录', 2000)
       }else{
        this._toast.fail('注册失败', 2000);
       }
     })
  }
};
  ngOnInit() {
    this.buildForm();
    this.renderFooter = this.bindRenderFooter.bind(this);
  }

}
