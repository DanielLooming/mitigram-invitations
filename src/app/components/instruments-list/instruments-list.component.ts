import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { QuoteHeadlineContainerComponent } from '../quote-headline-container/quote-headline-container.component';
import { Instrument } from '../../models/instrument.model';

@Component({
  selector: 'app-instruments-list',
  standalone: true,
  imports: [NgFor, RouterLink, MatCardModule, MatGridListModule, MatButtonModule, QuoteHeadlineContainerComponent], 
  templateUrl: './instruments-list.component.html',
  styleUrl: './instruments-list.component.scss'
})
export class InstrumentsListComponent {
  //TODO retrieve Instruments through an HttpClient
  instruments: Instrument[] = [
    {
      name: 'Advanced Micro Devices Inc',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      id: 'amd'
    },
    {
      name: 'Palo Alto',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      id: 'paloalto'
    },
    {
      name: 'Uber',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      id: 'uber'
    }
  ]
}
