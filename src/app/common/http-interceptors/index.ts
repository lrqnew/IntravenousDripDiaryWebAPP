/**
 * 拦截器 收集
 * barrel
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../app.myIntercept';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];