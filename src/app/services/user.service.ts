import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared.module';
import { UserByGroup } from '../models/user-group.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  private dataUrl = 'assets/data.json';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrl);
  }

  groupDataByGroup(data: User[]): UserByGroup[] {
    return data.flatMap((obj) => {
      const groups = obj.groups || ['Other'];
      return groups.map((group: string) => ({
        ...obj,
        id: obj._id,
        groups: group,
        name: `${obj.name.first} ${obj.name.last}`,
      }));
    });
  }  
}
