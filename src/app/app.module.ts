import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutBarComponent } from './components/about-bar/about-bar.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginFormComponent } from './components/auth/Forms/loginForm/loginForm.component';
import { RegistrationFormComponent } from './components/auth/Forms/registrationForm/registrationForm.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AboutBarComponent,
    CategoryBarComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    LoginFormComponent,
    RegistrationFormComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
