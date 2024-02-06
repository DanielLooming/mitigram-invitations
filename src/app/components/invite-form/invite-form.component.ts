import { StateService } from './../../services/state.service';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { GroupedUser, UserService } from '../../services/user.service';
import { QuoteHeadlineContainerComponent } from '../quote-headline-container/quote-headline-container.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invite-form',
  standalone: true,
  imports: [NgSelectModule, FormsModule, NgFor, RouterLink, QuoteHeadlineContainerComponent, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './invite-form.component.html',
  styleUrl: './invite-form.component.scss'
})
export class InviteFormComponent {
  users: GroupedUser[] = [];
  allUsers: GroupedUser[] = [];
  selectedUsers: GroupedUser[] = [];
  nonDuplicatedUsers: GroupedUser[] = [];
  isValidEmail!: boolean;
  term: string = '';
  id: string = '';

  colorRows: boolean[] = [true, true, true, false, true];
  

  constructor(
    private userService: UserService,
    private state: StateService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.colorRows = [true, true, true, true, true];
    this.userService.getUsers().subscribe((users) => {
      this.users = this.userService.groupDataByGroup(users);

      this.allUsers = this.userService.groupDataByGroup(users);
    });
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.selectedUsers = this.state.getSate(this.id);
    this.onChange(this.selectedUsers);
    
  }

  setState() {
    
  }

  onChange(items: GroupedUser[]) {
    this.nonDuplicatedUsers = Object.values(
      items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})
    );
    this.state.setState(this.id, this.selectedUsers);
  }

  clearItem(event: any) {
    console.log(this.selectedUsers);
    this.selectedUsers = this.selectedUsers.filter(
      (selectedUser) => selectedUser.email !== event.value.email
    );
    this.onChange(this.selectedUsers);
  }

  onDropdownOpen() {
   
  }

  searchFn = (term: string, item: GroupedUser) => {
    term = term.toLocaleLowerCase();
    this.term = term;
    return (
      item.name.toLocaleLowerCase().includes(term) ||
      item.email.toLocaleLowerCase().includes(term) ||
      item.groups.toLocaleLowerCase().includes(term)
    );
  };
  addTag = (term: string) => {
    if (!this.isEmail(term)) {
      this.isValidEmail = false;
      return false;
    } else {
      this.isValidEmail = true;
      return { email: term };
    }
  };

  onClose() {
    
  }
  onSubmit() {
    
  }
  isEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  alreadyExist(email: string) {
    return this.selectedUsers.some(
      (selectedUser) => selectedUser.email === email
    );
  }

  customOptions = (option: any, value: any): any => {
    const index = option.index || 0; // Ensure you have the correct index
    return {
      'custom-row-class': index % 2 === 0,
      'another-row-class': index % 2 !== 0,
    };
  };
}
