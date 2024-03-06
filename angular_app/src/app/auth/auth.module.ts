import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [
    // LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ]
})

export class AuthModule { }
