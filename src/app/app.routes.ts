import { InstrumentsListComponent } from './components/instruments-list/instruments-list.component';
import { ListPreviewComponent } from './components/list-preview/list-preview.component';
import { InviteFormComponent } from './components/invite-form/invite-form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', component: InstrumentsListComponent},
    {path: 'invite/:id', component: InviteFormComponent},
    {path: 'preview/:id', component: ListPreviewComponent}
];
