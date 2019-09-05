import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { from } from 'rxjs';
import {LogoComponent} from './components/logo/logo.component';
import { RegComponent } from './components/reg/reg.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import {apiList} from './common/app.api';
import {httpInterceptorProviders} from 'src/app/common/http-interceptors/index';
import { DiaryDetailsComponent } from './components/diary-details/diary-details.component';
@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    RegComponent,
    LoginComponent,
    IndexComponent,
    DiaryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdMobileModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders,apiList],
  bootstrap: [AppComponent]
})
export class AppModule { }
