import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})
export class InputSwitchComponent {

  @Input() fetchStatus;
  @Output()  changeMyTheme = new EventEmitter<any>();
  checked:boolean;

  ngOnInit(){
  }



  switchPressed(){

    let info:any={
      messageFromSwitch: true,
      statusOfClick: this.fetchStatus
    }
    
    this.changeMyTheme.emit(info);
    

  }

}
