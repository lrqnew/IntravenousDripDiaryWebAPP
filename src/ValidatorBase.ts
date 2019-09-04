import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core'

export class ValidateBase {
    //验证邮箱
    static EMAIL_REG = new RegExp('\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}');
    //最少几位
    static MIN_LENGTH=new RegExp('\\d{5,}');
    //第一次密码
    static password:string;
    static email(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => { 
          if (!ValidateBase.EMAIL_REG.test(control.value)) { 
            return { 
              email: true
            };
          }
          return {}; 
        };
      };
      static maxLength(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => { 
          ValidateBase.password =control.value
          if (!ValidateBase.MIN_LENGTH.test(control.value)) { 
            return { 
              pwd: true
            };
          }
          return {}; 
        };
      };
      static rePwd(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => { 
          console.log(control.value);
          if (ValidateBase.password!==control.value) { 
            return { 
              repwd: true
            };
          }
          return {}; 
        };
      }
   
}
