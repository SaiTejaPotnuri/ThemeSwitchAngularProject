import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtontagComponent } from './buttontag/buttontag.component';
import { PrimengModule } from '../primeng/primeng.module';
import { InputtagComponent } from './inputtag/inputtag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ButtontagComponent,
    InputtagComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  exports:[
    ButtontagComponent,
    InputtagComponent
  ]
})
export class ReusebleComponentsModule { }
