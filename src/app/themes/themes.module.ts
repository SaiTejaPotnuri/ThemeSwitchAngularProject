import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ColorPickerThemeComponent } from './color-picker-theme/color-picker-theme.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemesDashboardComponent } from './themes-dashboard/themes-dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderpageComponent } from './headerpage/headerpage.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { userthemeReducer } from '../states/usertheme.reducer';
import { userThemesListReducer } from '../states/userthemelist.reducer';
import { themeListContainer } from '../states/userthemelist.selector';
import { newlyGeneratedTheme } from '../states/usertheme.selector';


@NgModule({
  declarations: [
    ColorPickerThemeComponent,
    ThemesDashboardComponent,
    HomepageComponent,
    HeaderpageComponent
  ],
  imports: [
    CommonModule,
    ThemesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(newlyGeneratedTheme,userthemeReducer),
    StoreModule.forFeature(themeListContainer, userThemesListReducer)


    
  ]
})
export class ThemesModule { }
