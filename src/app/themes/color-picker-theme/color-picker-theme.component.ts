import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebSocketServerService } from 'src/app/Services/web-socket-server.service';


@Component({
  selector: 'app-color-picker-theme',
  templateUrl: './color-picker-theme.component.html',
  styleUrls: ['./color-picker-theme.component.scss']
})
export class ColorPickerThemeComponent implements OnInit {

  retrivedFontColor: any;
  themesColorFetchingStatus: boolean = false
  messageForm: FormGroup;
  userData: string;
  feedback: string
  company = {
    companyLogo: 'assets/Images/companyLogo.png'
  }
  messageFromClient: string
  messageArray: { user: string, message: string }[] = [];

  loggedInUser:string;
  constructor(private fb: FormBuilder, private webSocketService: WebSocketServerService) {
    this.messageForm = this.fb.group({
      messageText: ['']
    })
    this.loggedInUser = this.userData = localStorage.getItem('userInfo')

  }
  


  ngOnInit(): void {
    this.webSocketService.listen('typing').subscribe((data: { user: string, message: string }) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data: { user: string, message: string }) => this.updateMessage(data));
    this.messageForm.get('messageText').setValue(null)
  }


  messageTyping(info): void {
    
    
    this.webSocketService.emit('typing', this.loggedInUser);
    
    if(info ==='' || info===null){
      this.messageForm.get('messageText').setValue(null)
    }
    else{
      if (info.keyEntered === 13) {
        if (info.enteredText === null) {
          this.messageForm.get('messageText').setValue(null)
        }
        else {
          this.messageForm.get('messageText').setValue(info.enteredText)
          this.sendMessage(this.messageForm.value);
        }
      }
    }


    

    
  }





  sendMessage(message): void {
    // this.userData = localStorage.getItem('userInfo')


    if (message.messageText !== null){
      this.webSocketService.emit('chat', {
        user: this.loggedInUser,
        message: message.messageText
      });

    }

    message = "";
    this.messageForm.reset();


  }

  updateMessage(data: any) {
    this.feedback = '';
    if (!data) return;
    this.messageArray.push(data);
  }

  updateFeedback(data: any) {
    this.feedback = `${data} is typing a message`;
  }



}
// if (bw) {
//   return (r * 0.299 + g * 0.587 + b * 0.114) > 186
//     ? '#000000'
//     : '#FFFFFF';
// }

// //invert color
// let rColorInText = (255 - r).toString(16)
// let gColorInText = (255 - g).toString(16)
// let bColorInText = (255 - b).toString(16)

// return "#" + rColorInText + gColorInText + bColorInText;