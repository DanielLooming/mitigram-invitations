import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quote-headline-container',
  standalone: true,
  imports: [],
  templateUrl: './quote-headline-container.component.html',
  styleUrl: './quote-headline-container.component.scss'
})
export class QuoteHeadlineContainerComponent {
  @Input() message: string = '';
  @Input() underlineWidth: string = '30%'; //default
}
