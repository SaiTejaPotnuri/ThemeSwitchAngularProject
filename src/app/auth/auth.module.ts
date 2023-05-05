import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReusebleComponentsModule } from '../shared/reuseble-components/reuseble-components.module';
import { PrimengModule } from '../shared/primeng/primeng.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReusebleComponentsModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AuthModule { }
