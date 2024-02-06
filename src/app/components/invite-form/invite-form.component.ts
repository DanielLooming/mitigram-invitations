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
import { isEmail } from 'validator';

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

  isUsersFetched: boolean = false;

  constructor(
    private userService: UserService,
    private state: StateService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchUsersAndInitialize();
  }
  
  private fetchUsersAndInitialize(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = this.userService.groupDataByGroup(users);
      this.allUsers = [...this.users]; // Ensure deep copy to prevent reference issues
      this.selectedUsers = this.state.getSate(this.id);
      this.onChange(this.selectedUsers);

      this.isUsersFetched = true; 
    });
  }

  isNextButtonDisabled(): boolean {
    return !this.isUsersFetched;
  }
  
  onChange(selectedUsers: GroupedUser[]) {
    this.nonDuplicatedUsers = this.getNonDuplicatedUsers(selectedUsers);
    this.state.setState(this.id, selectedUsers);
  }

  private getNonDuplicatedUsers(users: GroupedUser[]): GroupedUser[] {
    const uniqueUsersMap = new Map<string, GroupedUser>();
    
    users.forEach(user => {
      uniqueUsersMap.set(user.id, user);
    });
  
    return Array.from(uniqueUsersMap.values());
  }

  clearUsers(selectedUserToRemove: GroupedUser) {
    this.selectedUsers = this.selectedUsers.filter(
      (user) => user.email !== selectedUserToRemove.email
    );
    this.onChange(this.selectedUsers);
  }

  searchUsers = (term: string, user: GroupedUser) => {
    term = term.toLocaleLowerCase();
    this.term = term;
  
    const isNameMatch = new RegExp(term, 'i').test(user.name);
    const isEmailMatch = new RegExp(term, 'i').test(user.email);
    const isGroupsMatch = new RegExp(term, 'i').test(user.groups);
  
    return isNameMatch || isEmailMatch || isGroupsMatch;
  };
  

  addNewUser = (userName: string) => {
    const isValidEmail = this.emailValid(userName);
  
    if (!isValidEmail) {
      this.isValidEmail = false;
      return false;
    }
  
    this.isValidEmail = true;
    return { email: userName };
  };  

  emailValid(email: string): boolean {
    return isEmail(email);
  }
  
  doesUserExist(email: string): boolean {
    return this.selectedUsers.some(user => user.email === email);
  }

  customOptions = (option: any, value: any): any => {
    const index = option.index || 0; // Ensure you have the correct index
    return {
      'custom-row-class': index % 2 === 0,
      'another-row-class': index % 2 !== 0,
    };
  };
}