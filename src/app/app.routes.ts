import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'overview', component: OverviewPageComponent, canActivate: [authGuard] },
];
