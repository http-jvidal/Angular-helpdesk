import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  user = {} as User;
  users!: User[];
  f: any;

  saveUser(arg0: any) {
    throw new Error('Method not implemented.');
    }
}
