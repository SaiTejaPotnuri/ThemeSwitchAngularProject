import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'mythemes', loadChildren: () => import('./themes/themes.module').then((m) => m.ThemesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
