import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-display',
  standalone: true,
  imports: [],
  templateUrl: './user-display.component.html',
  styleUrl: './user-display.component.scss'
})
export class UserDisplayComponent {
  @Input() user: any;
  @Output() removeUser: EventEmitter<void> = new EventEmitter<void>();
}
