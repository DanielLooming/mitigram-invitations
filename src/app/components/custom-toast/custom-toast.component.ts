import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-toast',
  standalone: true,
  imports: [],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.scss'
})
export class CustomToastComponent {
  @Input() message: string = ''; //Future Use
}
