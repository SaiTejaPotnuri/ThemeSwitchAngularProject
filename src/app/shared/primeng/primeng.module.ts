import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    DialogModule, 
    CardModule,
    InputSwitchModule,
    TableModule
    
  ],
  exports:[
    ButtonModule ,
    InputTextModule,
    DialogModule,
    CardModule,
    InputSwitchModule,
    TableModule
    
  ]

})
export class PrimengModule { }
