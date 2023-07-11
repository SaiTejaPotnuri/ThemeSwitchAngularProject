import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { OAuth2InitComponent } from './auth/oauth2-init/oauth2-init.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'authenticate',  component: OAuth2InitComponent },
  { path: 'mythemes', loadChildren: () => import('./themes/themes.module').then((m) => m.ThemesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
