import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { CreateResponseComponent } from './create-response/create-response.component';
import { ViewEventComponent } from './view-event/view-event.component';

export const routes: Routes = [
    { path: 'overview', component: OverviewComponent },
    { path: 'view-event', component: ViewEventComponent },
    { path: 'create-response', component: CreateResponseComponent },
];
