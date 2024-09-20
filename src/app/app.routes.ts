import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './auth.guard';
import { OverviewComponent } from './pages/overview/overview.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ManageQuestionsPageComponent } from './pages/manage-questions-page/manage-questions-page.component';
import { AdministrateQuestionComponent } from './pages/administrate-question/administrate-question.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'overview', component: OverviewComponent, canActivate: [authGuard] },
  {
    path: 'view-case/:id',
    component: DetailsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'manage-questions',
    component: ManageQuestionsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'administrate-question',
    component: AdministrateQuestionComponent,
    canActivate: [authGuard],
  }
];
