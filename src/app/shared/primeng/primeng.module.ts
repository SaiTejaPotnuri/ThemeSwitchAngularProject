import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    DialogModule
    
  ],
  exports:[
    ButtonModule ,
    InputTextModule,
    DialogModule
    
  ]

})
export class PrimengModule { }
