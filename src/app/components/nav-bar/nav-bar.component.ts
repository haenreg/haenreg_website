import { Component } from '@angular/core';
import { UserStoreService } from '../../stores/user-store.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(
    public userStore: UserStoreService,
    private router: Router,
  ){

  }

  onLogout() {
    this.userStore.clearUser();
    this.router.navigate(['/']);
  }
}
