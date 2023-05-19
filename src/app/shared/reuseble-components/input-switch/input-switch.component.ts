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

    this.checked = localStorage.getItem('primary') === '#5f5f63' ? true : false
    
  }



  switchPressed(){

    let info:any={
      messageFromSwitch: true,
      statusOfClick: this.checked
    }
    
    this.changeMyTheme.emit(info);
    

  }

}
