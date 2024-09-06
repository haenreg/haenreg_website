import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { CreateResponseComponent } from './pages/create-response/create-response.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';

export const routes: Routes = [
    { path: 'overview', component: OverviewComponent },
    { path: 'view-event', component: ViewEventComponent },
    { path: 'create-response', component: CreateResponseComponent },
];
