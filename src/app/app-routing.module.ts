import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { IndexComponent } from './components/index/index.component';
import {DiaryDetailsComponent} from './components/diary-details/diary-details.component'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },//默认路径
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: RegComponent },
  {
    path: 'index', component: IndexComponent,
    children: [{
      path: 'diaryDetalis',
      component:DiaryDetailsComponent
    }

    ]




  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
