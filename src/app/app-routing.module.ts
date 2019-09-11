import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuardServiceService} from './service/guard-service.service'
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { IndexComponent } from './components/index/index.component';
import {DiaryDetailsComponent} from './components/diary-details/diary-details.component';
import {LookDiaryComponent} from './components/look-diary/look-diary.component';
import {WriteDiaryComponent} from './components/write-diary/write-diary.component';
import {UserCenterComponent} from './components/user-center/user-center.component';
import {AboutComponent} from './components/about/about.component';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {ModifyComponent} from './components/modify/modify.component'
import { from } from 'rxjs';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },//默认路径
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: RegComponent },
  {
    path: 'index', component: IndexComponent,
    canActivate:[GuardServiceService],
    children: [{
      path: 'diaryDetalis/:id',
      component:DiaryDetailsComponent,
      canActivate:[GuardServiceService]
    },
    {
      path: 'writeDiary',
      component:WriteDiaryComponent,
      canActivate:[GuardServiceService]
    },
    {
      path: 'lookDiary',
      component:LookDiaryComponent,
      canActivate:[GuardServiceService]
    },{
      path: 'userCenter',
      component:UserCenterComponent,
      canActivate:[GuardServiceService]
    },{
      path:'about',
      component:AboutComponent,
      canActivate:[GuardServiceService]
    },{
      path:'feed',
      component:FeedbackComponent,
      canActivate:[GuardServiceService]
    },{
      path:'modify',
      component:ModifyComponent,
      canActivate:[GuardServiceService]
    }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
