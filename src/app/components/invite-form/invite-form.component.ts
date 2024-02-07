import { StateService } from './../../services/state.service';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '../../services/user.service';
import { QuoteHeadlineContainerComponent } from '../quote-headline-container/quote-headline-container.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { isEmail } from 'validator';
import { SharedModule } from '../../shared.module';
import { UserByGroup } from '../../models/user-group.model';

@Component({
  selector: 'app-invite-form',
  standalone: true,
  imports: [NgSelectModule, FormsModule, NgFor, RouterLink, QuoteHeadlineContainerComponent, MatButtonModule, CommonModule, FormsModule],
  providers: [UserService],
  templateUrl: './invite-form.component.html',
  styleUrl: './invite-form.component.scss'
})
export class InviteFormComponent {
  uniqueInvitedUsers: UserByGroup[] = [];
  isValidEmail!: boolean;
  typedUser: string = '';
  id: string = '';
  usersInvited: UserByGroup[] = []; 
  selectedUsers: UserByGroup[] = [];
  allInvitedUsers: UserByGroup[] = [];

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
      this.usersInvited = this.userService.groupDataByGroup(users);
      this.allInvitedUsers = [...this.usersInvited]; 
      this.selectedUsers = this.state.getSate(this.id);
      this.onChange(this.selectedUsers);

      this.isUsersFetched = true; 
    });
  }

  addNewUser = (userName: string) => {
    const isValidEmail = this.emailValid(userName);
  
    if (!isValidEmail) {
      this.isValidEmail = false;
      return false;
    }
  
    this.isValidEmail = true;
    return { email: userName };
  };

  searchUsers = (typedUser: string, user: UserByGroup) => {
    typedUser = typedUser.toLocaleLowerCase();
    this.typedUser = typedUser;
  
    const isNameMatch = new RegExp(typedUser, 'i').test(user.name);
    const isEmailMatch = new RegExp(typedUser, 'i').test(user.email);
    const isGroupsMatch = new RegExp(typedUser, 'i').test(user.groups);
  
    return isNameMatch || isEmailMatch || isGroupsMatch;
  };

  emailValid(email: string): boolean {
    return isEmail(email);
  }

  onChange(selectedUsers: UserByGroup[]) {
    this.uniqueInvitedUsers = this.getNonDuplicatedUsers(selectedUsers);
    this.state.setState(this.id, selectedUsers);
  }

  private getNonDuplicatedUsers(users: UserByGroup[]): UserByGroup[] {
    const uniqueUsersMap = new Map<string, UserByGroup>();
    
    users.forEach(user => {
      uniqueUsersMap.set(user.id, user);
    });
  
    return Array.from(uniqueUsersMap.values());
  }

  doesUserExist(email: string): boolean {
    return this.selectedUsers.some(user => user.email === email);
  }

  handleRemoveUserEvent(removedUser: any) {
    this.clearUser(removedUser);
  }

  clearUser(selectedUserToRemove: UserByGroup) {
    this.selectedUsers = this.selectedUsers.filter(
      (user) => user.email !== selectedUserToRemove.email
    );
    this.onChange(this.selectedUsers);
  }

  customOptions = (option: any, value: any): any => {
    const index = option.index || 0; // Ensure you have the correct index
    return {
      'custom-row-class': index % 2 === 0,
      'another-row-class': index % 2 !== 0,
    };
  };
}