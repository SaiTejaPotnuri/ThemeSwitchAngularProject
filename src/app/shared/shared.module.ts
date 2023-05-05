import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { ReusebleComponentsModule } from './reuseble-components/reuseble-components.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PrimengModule,
    ReusebleComponentsModule,
  
  ]
})
export class SharedModule { }
