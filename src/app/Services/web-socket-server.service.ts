import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketServerService {

  socket: Socket
  url = 'http://10.25.0.2:3000/'

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
