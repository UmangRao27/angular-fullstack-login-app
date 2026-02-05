import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './login.html'
})
export class Login {
  loginForm: FormGroup;
  hidePassword = true;

  get password() {
    return this.loginForm.get('password')!;
  }

  get username() {
    return this.loginForm.get('username')!;
  }

 constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}

onSubmit(): void {
  if (this.loginForm.valid) {
    const loginData = {
      userId : this.loginForm.value.username,
      password : this.loginForm.value.password 
  }

  this.http.post<any>('http://localhost:5100/api/auth/login', loginData)
  .subscribe({
    next: (user) => {
      localStorage.setItem('user', JSON.stringify(user));

      this.router.navigate(['/home'], {
        queryParams : { username : this.loginForm.value.username, 
                        password : this.loginForm.value.password
        }
      })
    },
    error: (err) => {
      alert('Invalid Username or Password');
    }
  })

  }
}

}



