import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemesDashboardComponent } from './themes-dashboard/themes-dashboard.component';
import { ColorPickerThemeComponent } from './color-picker-theme/color-picker-theme.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: ThemesDashboardComponent,
    children: [
      { path: 'colorPicker', component: ColorPickerThemeComponent },
      {path:'themeHome',component:HomepageComponent},
      { path: '', redirectTo:'/mythemes/themeHome',pathMatch:'full'}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemesRoutingModule { }
