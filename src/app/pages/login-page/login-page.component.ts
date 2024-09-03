import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  async login(name: string) {
    let password = '';
    switch (name) {
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
        console.log('Login successful:', response);
        // Assuming the response contains the token, e.g., response.token
        const authToken = response.token; 
        localStorage.setItem('authToken', authToken);
        this.router.navigate(['/overview']);
      },
      error => {
        alert(error.error.error);
      }
    );
  }
}
