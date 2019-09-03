import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {ValidateBase} from '../../../ValidatorBase'
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
  ) { }
  isError: boolean = false;
  renderFooter: Function;
  registerForm: FormGroup;
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
  formErrors: any = {
    username: '',
    password: ''
  };
  onFocus: object = {
    focus: false
  };
  inputErrorClick(e) {
    const toast = this._toast.fail('邮箱格式错误', 2000);
  };
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
  };
  bindRenderFooter() {
    return (this.formErrors && this.formErrors['username']) || '';
  };
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
  };
  onSubmit() {
  
  };
  ngOnInit() {
    this.buildForm();
    this.renderFooter = this.bindRenderFooter.bind(this);
  }

}
