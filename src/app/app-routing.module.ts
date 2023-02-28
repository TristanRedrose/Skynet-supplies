import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginFormComponent } from './components/auth/Forms/loginForm/loginForm.component';
import { RegistrationFormComponent } from './components/auth/Forms/registrationForm/registrationForm.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginFormComponent },
      { path:'register', component: RegistrationFormComponent },
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
