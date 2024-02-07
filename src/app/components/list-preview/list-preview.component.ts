import { StateService } from './../../services/state.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { UserDisplayComponent } from '../user-display/user-display.component';
import { QuoteHeadlineContainerComponent } from '../quote-headline-container/quote-headline-container.component';
import { UserByGroup } from '../../models/user-group.model';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { CustomToastComponent } from '../custom-toast/custom-toast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-preview',
  standalone: true,
  imports: [NgFor, RouterLink, UserDisplayComponent, QuoteHeadlineContainerComponent, MatButtonModule, CustomToastComponent, CommonModule],
  templateUrl: './list-preview.component.html',
  styleUrl: './list-preview.component.scss'
})
export class ListPreviewComponent implements OnInit {
  id: string = '';

  users: UserByGroup[] = [];

  constructor(private route: ActivatedRoute,
              private state: StateService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.users = this.state.getSate(this.id);
  }

  onInvite() {
    const toastConfig: Partial<IndividualConfig> = {
      toastComponent: CustomToastComponent,
      timeOut: 3000, 
    };

    const toast = this.toastr.show('Invitations send!', 'Success!', toastConfig);
    
    setTimeout(() => {
      this.toastr.remove(toast.toastId);
    }, 3000);

    this.state.setState(this.id, []);
    this.router.navigateByUrl('/');
  }

  removeUser(user: UserByGroup) {
    this.users = this.users.filter(u => u !== user);
    this.state.setState(this.id, this.users);
  }
}
