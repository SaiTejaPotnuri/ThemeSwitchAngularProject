import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    DialogModule, 
    CardModule
    
  ],
  exports:[
    ButtonModule ,
    InputTextModule,
    DialogModule,
    CardModule
    
  ]

})
export class PrimengModule { }
