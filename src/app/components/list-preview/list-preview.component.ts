import { StateService } from './../../services/state.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-preview',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list-preview.component.html',
  styleUrl: './list-preview.component.scss'
})
export class ListPreviewComponent implements OnInit {

  id: string = '';

  users: any[] = [];

constructor(private route: ActivatedRoute,
            private state: StateService,
            private router: Router,
            private toastr: ToastrService) {

}

ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id') || '';
  this.users = this.state.getSate(this.id);
}

onInvite() {
  //clear state
  this.state.setState(this.id, []);
  this.router.navigateByUrl('/');
  this.toastr.success('Invitations send!');
}
 
}
