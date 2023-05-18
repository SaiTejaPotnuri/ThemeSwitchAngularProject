import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})
export class InputSwitchComponent {

  @Output()  changeMyTheme = new EventEmitter<any>();
  checked:boolean;


  switchPressed(){

    let info:any={
      messageFromSwitch: true,
      statusOfClick: this.checked
    }
    
    this.changeMyTheme.emit(info);
    

  }

}
