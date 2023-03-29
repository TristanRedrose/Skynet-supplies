import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginFormComponent } from './components/auth/Forms/loginForm/loginForm.component';
import { RegistrationFormComponent } from './components/auth/Forms/registrationForm/registrationForm.component';
import { AdminPageComponent } from './components/business/admin/admin.component';
import { AddCategoryComponent } from './components/business/workspace/addCategory/addCategory.component';
import { EmployeeRegistrationFormComponent } from './components/business/workspace/addEmployee/registrationForm.component';
import { EditEmployeeFormComponent } from './components/business/workspace/editEmployee/editEmployee.component';
import { EmployeeTableComponent } from './components/business/workspace/employeeTable/employeeTable.component';
import { ContactComponent } from './components/contact/contact.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent, canActivate: [RoleGuard], children: [
    {path: 'employee', component: EmployeeTableComponent},
    {path: 'employee/add', component: EmployeeRegistrationFormComponent},
    {path: 'employee/edit', component: EditEmployeeFormComponent},
    {path: 'categories/add', component: AddCategoryComponent},
  ]},
  { path: '', component: LayoutComponent, children: [
    { path: 'about', component: AboutComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegistrationFormComponent },
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
