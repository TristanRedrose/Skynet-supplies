import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-navbar/main-navbar.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginFormComponent } from './components/auth/Forms/loginForm/loginForm.component';
import { RegistrationFormComponent } from './components/auth/Forms/registrationForm/registrationForm.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminPageComponent } from './components/business/admin/admin.component';
import { EmployeeRegistrationFormComponent } from './components/business/workspace/addEmployee/registrationForm.component';
import { EmployeeTableComponent } from './components/business/workspace/employeeTable/employeeTable.component';
import { AuthInterceptorService } from './services/auth/authInterceptorService';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainNavComponent,
    CategoryBarComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    AboutComponent,
    ContactComponent,
    AdminPageComponent,
    EmployeeRegistrationFormComponent,
    EmployeeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
