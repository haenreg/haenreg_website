import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../stores/user-store.service';
import { iUser } from '../../interfaces/iUser';
import { ButtonComponent } from "../../components/button/button.component";


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HttpClientModule, ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private httpService: HttpService,
    private router: Router,
    private userStoreService: UserStoreService,
  ) {}

  async login(name: string) {
    let password = '';
    switch (name.toLocaleLowerCase()) {
      case 'kurt': {
        password = 'password123';
        break;
      }
      case 'bente': {
        password = 'password123';
        break;
      }
    }

    this.httpService.login({ username: name, password: password }).subscribe(
      response => {
        const authToken = response.token; 
        const user: iUser = {
          username: response.username,
          organization: response.organization
        };

        // Save authToken in localStorage
        localStorage.setItem('authToken', authToken);

        // Save the User object in the store
        this.userStoreService.setUser(user);

        // Navigate to the overview page
        this.router.navigate(['/overview']);
      },
      error => {
        alert(error.error.error);
      }
    );
  }
}
