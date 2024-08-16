import { Component } from '@angular/core';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  user = {} as User;
  users: User[] = [];


  
}
