import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { authGuard } from './auth.guard';
import { CreateResponseComponent } from './pages/create-response/create-response.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { OverviewComponent } from './pages/overview/overview.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'overview', component: OverviewComponent, canActivate: [authGuard] },
    { path: 'view-event', component: ViewEventComponent },
    { path: 'create-response', component: CreateResponseComponent },
];
