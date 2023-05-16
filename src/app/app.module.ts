import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemesModule } from './themes/themes.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { WebSocketServerService } from './Services/web-socket-server.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ThemesModule,
    HttpClientModule,
    BrowserAnimationsModule,
      FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1300,
      preventDuplicates: true,
      tapToDismiss: true,
    }),
    
  ],
  providers: [WebSocketServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
