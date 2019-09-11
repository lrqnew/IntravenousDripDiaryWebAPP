/**
 * 拦截器验证token
 */
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,  } from 'rxjs';
import {apiList} from './app.api'
import { tap } from 'rxjs/operators';
import { ToastService } from 'ng-zorro-antd-mobile';
@Injectable()
export class InterceptorService implements HttpInterceptor {
    
    constructor( public router: Router,  public api: apiList,  private _toast: ToastService,) { 
        // localStorage.setItem('access_token', 'xxxxxxxxxxxxx')
    };
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let authReq: any;
        // 实现第一次不拦截的方式：1. 指定接口不拦截  2. 判断本地localStorage
        let loginUrl = this.api.baseurl + this.api.urlList['userLogin']['path'];
        let selectMail = this.api.baseurl + this.api.urlList['selectMail']['path'];
        if (req.url !== loginUrl&&req.url!==selectMail) {
          
            if (localStorage.getItem('token')) {
                // console.log(2);
                const token = localStorage.getItem('token');
                authReq = req.clone({ setHeaders: {Authorization:"Bearer "+token } });
                return next.handle(authReq).pipe(
                    tap(
                     event => {
                      if (event instanceof HttpResponse) {
                    //    if (event.status >= 500) {
                    //     // 跳转错误页面
                    //    }
                      }
                     },
                     error => {
                         this._toast.fail('登录过期,请重新登录',3000);
                         localStorage.clear();
                         this.router.navigate(['/login']);
                      // token过期 服务器错误等处理
                     })
                   );
            } else {
                // 未登录  ==  access_token
                this.router.navigate(['/login']);
            }
        }
        authReq = req.clone({ setHeaders: {} });
        // return next.handle(authReq);
        return next.handle(authReq)
    };
   
}