import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: any;
  @Input() subtitle: any;
  @Input() text: any


  tickets = [
    { status: 'pendentes', quantity: 8 },
    { status: 'novos', quantity: 6 },
    { status: 'em atendimento', quantity: 6 },
    { status: 'parados', quantity: 1 }
  ];
}
