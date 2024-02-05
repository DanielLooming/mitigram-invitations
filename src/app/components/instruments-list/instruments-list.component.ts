import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instruments-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './instruments-list.component.html',
  styleUrl: './instruments-list.component.scss'
})
export class InstrumentsListComponent {
  instruments: any[] = [
    {
      name: 'Test 1',
      description: 'test1',
      id: 'test1'
    },
    {
      name: 'Test 2',
      description: 'test2',
      id: 'test2'
    },
    {
      name: 'Test 3',
      description: 'test3',
      id: 'test3'
    }
  ]
}
