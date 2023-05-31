import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtontagComponent } from './buttontag/buttontag.component';
import { PrimengModule } from '../primeng/primeng.module';
import { InputtagComponent } from './inputtag/inputtag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchComponent } from './input-switch/input-switch.component';
import { CheckboxtypeComponent } from './checkboxtype/checkboxtype.component';



@NgModule({
  declarations: [
    ButtontagComponent,
    InputtagComponent,
    InputSwitchComponent,
    CheckboxtypeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  exports:[
    ButtontagComponent,
    InputtagComponent,
    InputSwitchComponent,
    CheckboxtypeComponent
  ]
})
export class ReusebleComponentsModule { }
