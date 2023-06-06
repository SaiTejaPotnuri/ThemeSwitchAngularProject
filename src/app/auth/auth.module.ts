import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReusebleComponentsModule } from '../shared/reuseble-components/reuseble-components.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { userthemeReducer } from '../states/usertheme.reducer';
import { StoreModule } from '@ngrx/store';
import { userThemesListReducer } from '../states/userthemelist.reducer';
import { themeListContainer } from '../states/userthemelist.selector';
import { newlyGeneratedTheme } from '../states/usertheme.selector';



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
    StoreModule.forFeature(newlyGeneratedTheme, userthemeReducer),
    StoreModule.forFeature(themeListContainer, userThemesListReducer)


  ]
})
export class AuthModule { }
