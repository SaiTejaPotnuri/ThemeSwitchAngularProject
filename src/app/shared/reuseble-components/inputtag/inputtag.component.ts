import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomthemeService } from 'src/app/Services/customtheme.service';

@Component({
  selector: 'app-inputtag',
  templateUrl: './inputtag.component.html',
  styleUrls: ['./inputtag.component.scss']
})
export class InputtagComponent {
  @Input() type: string | undefined;
  @Input() label: string | undefined;
  @Input() idInfo: string = '';
  @Input() formGroupInfo!: FormGroup;
  @Input() formControlNameInfo: string = ''
  @Input() placeholderText: string = ''
  @Input() iconInfo:string='';
  @Input() iconPosition="";
  @Output() valueChangeStatus = new EventEmitter<any>();
  colorName: any = '';





  constructor(private customThemeService:CustomthemeService) { }

  ngOnInit(): void {
    this.colorName = this.formGroupInfo.get(this.formControlNameInfo).value

  }

  fetchColorPicker(data){
      
      this.formGroupInfo.get(this.formControlNameInfo).setValue(data)

  }


  onchangeFunctionOnInput(amountData: any,eventType) { 
    let dataEntered = amountData;
    if (eventType.keyCode ===13){
      amountData={
        enteredText: dataEntered,
        keyEntered: eventType.keyCode
      }
    }
    else{
      amountData = dataEntered
      
    }

    this.valueChangeStatus.emit(amountData);
    
  } 


}
