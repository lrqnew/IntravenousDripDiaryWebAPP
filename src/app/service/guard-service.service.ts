import { Injectable } from '@angular/core';
import { CanActivate, Route} from '@angular/router'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GuardServiceService implements CanActivate {

  constructor(
    private router:Router
  ) { }
  canActivate(){
    if(localStorage.getItem('token')){
      return true
    }else{
      this.router.navigateByUrl('/login');
      return false
    }
   
  }
}
