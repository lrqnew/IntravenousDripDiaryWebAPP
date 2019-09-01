import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {ValidateBase} from '../../../ValidatorBase'
import { ToastService } from 'ng-zorro-antd-mobile';
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
})
export class LoginComponent implements OnInit {
 
  constructor(
    private _toast: ToastService
  ) { }
  renderFooter: Function;
  registerForm: FormGroup;
  stepper_value: number = 20;
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
      required: '邮箱为空',
      email:'邮箱格式不对'
    },
    password: {}
  };

  // renderHeader() {
  //   return 'Form Validation';
  // }
  failToast() {
    const toast = this._toast.fail('邮箱或密码格式输入错误', 1000);
  }

  bindRenderFooter() {
    return (this.formErrors && this.formErrors['username']) || '';
  }

  onClick() {
    console.log('click');
  }
  
  buildForm(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(this.formData.username, [
        Validators.required,
        // Validators.email
        ValidateBase.email()
       
      ]),
      password: new FormControl(this.formData.password, [])
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

  switchCheck(value) {
    console.log('switch status:', value);
  }

  onSubmit() {
    if (this.beforeSubmit()) {
      console.log(this.registerForm.value);
      this.onReset();
    } else {
      this.failToast();
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

  afterChange(event) {
    console.log(event, 'afterChange');
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
  }

  setpperChange($event) {
    console.log($event, 'change');
  }

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
