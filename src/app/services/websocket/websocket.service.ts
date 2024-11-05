import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;

  constructor() { }


  connect(url: string): Observable<any>{
    this.socket = new WebSocket(url);

    return new Observable(observer => {
      this.socket.onmessage = (event) => {
        observer.next(event.data);
      };

      this.socket.onerror = (event) =>{
        observer.error(event);
      };

      this.socket.onclose = () =>{
        observer.complete();
      };
    })
  }


  sendMessage(message: string){
    if(this.socket.readyState === WebSocket.OPEN){
      this.socket.send(message);
    } else {
      console.error("WebSocket não está aberto");
    }
  }


  close(){
    if(this.socket){
      this.socket.close();
    }
  }
}
