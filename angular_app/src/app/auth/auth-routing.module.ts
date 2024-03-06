import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { UnlockUserComponent } from './unlock-user/unlock-user.component';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: '',
  //   component: RegisterComponent,
  // },
//   {
//     path: 'forgot-password',
//     component: ForgetPasswordComponent,
//   },
//   {
//     path: 'unlock-password',
//     component: UnlockUserComponent,
//   },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
