import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttontag',
  templateUrl: './buttontag.component.html',
  styleUrls: ['./buttontag.component.scss']
})
export class ButtontagComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() classInfo: string | undefined;
  @Input() label: string = '';
  @Input() disabledInfo: boolean = false;
  @Input() buttonType: string = '';
  @Input() loadingStatus: boolean = false;
  @Output() buttonStatus = new EventEmitter<any>();

  checkAfterClick() {
    this.buttonStatus.emit();

  }


}
