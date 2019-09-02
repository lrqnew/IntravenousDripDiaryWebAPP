/**
 * 拦截器验证token
 */
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,  } from 'rxjs';
import {apiList} from './app.api'

@Injectable()
export class InterceptorService implements HttpInterceptor {
    
    constructor( public router: Router,  public api: apiList) { 
        // localStorage.setItem('access_token', 'xxxxxxxxxxxxx')
    };
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq: any;
        // 实现第一次不拦截的方式：1. 指定接口不拦截  2. 判断本地localStorage
        let loginUrl = this.api.baseurl + this.api.urlList['login']['path'];
        if (req.url !== loginUrl) {
            if (localStorage.getItem('access_token')) {
                // console.log(2);
                const token = localStorage.getItem('access_token');
                authReq = req.clone({ setHeaders: { token } });
                return next.handle(authReq);
            } else {
                // 未登录  ==  access_token
                this.router.navigate(['/login']);
            }
        }
        authReq = req.clone({ setHeaders: {} });
        return next.handle(authReq);
    }
    
}