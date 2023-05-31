import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkboxtype',
  templateUrl: './checkboxtype.component.html',
  styleUrls: ['./checkboxtype.component.scss']
})
export class CheckboxtypeComponent {

  @Input() formGroup:FormGroup
  @Input() labelForCheckBox:string
  @Input() checkBoxFormControlerName
  @Input() idForCheckBox


}
