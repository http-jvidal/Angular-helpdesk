import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  private message = "";
  public messages: string[]= [];
  private socketUrl: string = "ws://localhost:8082/websocket/chat";


  constructor(private webSocketService: WebsocketService){

  }
 

  ngOnInit(): void {
    this.webSocketService.connect(this.socketUrl).subscribe(
        (message: string) => {
          this.messages.push(message);
      }, 
        (error) => {
          console.error("Erro no WebSocket: " + error);
        }
    );
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

  sendMessage(): void {
    if(this.message.trim()){
      this.webSocketService.sendMessage(this.message);
      this.message = "";
    }
  }

}
