import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketServerService {

  socket: Socket
  // need to give your ipconfig IPV4 value like 10.25.0.184 or only one system place as a localhost
  url = 'http://10.25.0.10:3000/'

  constructor() {
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });
  }



  listen(eventname: string): Observable<any> {
    return new Observable<{ user: string, message: string }>((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    })
  }


  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }




}
