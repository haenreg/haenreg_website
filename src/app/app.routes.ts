import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './auth.guard';
import { CreateResponseComponent } from './pages/create-response/create-response.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { FieldsComponent } from './components/fields/fields.component';
import { ScaleComponent } from './components/scale/scale.component';
import { YesNoComponent } from './components/yes-no/yes-no.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'overview', component: OverviewComponent, canActivate: [authGuard] },
    { path: 'view-event', component: ViewEventComponent },
    { path: 'create-response', component: CreateResponseComponent },
    { path: 'fields', component: FieldsComponent },
    { path: 'scale', component: ScaleComponent },
    { path: 'yes-no', component: YesNoComponent },
];
