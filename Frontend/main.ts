import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app';
import { Login } from './app/pages/login/login';
import { Home } from './app/pages/home/home';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home}
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
