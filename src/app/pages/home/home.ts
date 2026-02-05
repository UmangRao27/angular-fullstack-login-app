import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.html'
})
export class Home {
  id = '';
  password = '';
  name = '';
  age = '';
  phone = '';
  email = '';
  city = '';

  constructor(private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if(!params['username']){
        this.router.navigate (['/'])
        return;
      }
    
    this.id = params['username'];
    this.password = params['password'];

    const user = JSON.parse(localStorage.getItem('user')!);
    if(user){
      this.name = user.name;
      this.age = user.age;
      this.phone = user.phone;
      this.email = user.email;
      this.city = user.city;
    }
  })
}

  goBack() {
    this.router.navigate(['/']);
  }
}
