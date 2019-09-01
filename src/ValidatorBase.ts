import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core'

export class ValidateBase {
    static EMAIL_REG = new RegExp('\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}');
    static email(): ValidatorFn {
       
        return (control: AbstractControl): { [key: string]: any } => { 
         
          if (!ValidateBase.EMAIL_REG.test(control.value)) { 
            return { 
              email: true
            };
          }
          return {}; 
        };
      }
   
}
