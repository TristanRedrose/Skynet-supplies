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
import { EmployeeRegistrationFormComponent } from './components/business/workspace/administrator/addEmployee/registrationForm.component';
import { EmployeeTableComponent } from './components/business/workspace/administrator/employeeTable/employeeTable.component';
import { AuthInterceptorService } from './services/auth/authInterceptorService';
import { SpinnerComponent } from './components/loading/spinner.component';
import { UserDataForm } from './components/business/admin/forms/userDataForm/userDataForm';
import { EditEmployeeFormComponent } from './components/business/workspace/administrator/editEmployee/editEmployee.component';
import { CategoryFormComponent } from './components/business/admin/forms/categoryForm/categoryForm.component';
import { AddCategoryComponent } from './components/business/workspace/administrator/addCategory/addCategory.component';
import { CategoryComponent } from './components/business/workspace/administrator/category/category.component';
import { EditCategoryFormComponent } from './components/business/workspace/administrator/editCategory/editCategory.component';
import { SingleFieldFormComponent } from './components/business/admin/forms/singleFieldForm/singleFieldForm.component';
import { ModalComponent } from './components/modals/modal.component';
import { EditSubcategoryComponent } from './components/business/workspace/administrator/editSubcategory/editSubcategory';
import { UserTableComponent } from './components/tables/userTable/userTable.component';
import { CustomerTableComponent } from './components/business/workspace/employee/customerTable/customerTable.component';
import { EditCustomerComponent } from './components/business/workspace/employee/editCustomer/editCustomer.component';
import { AddProductComponent } from './components/business/workspace/employee/addProduct/addProduct.component';
import { ProductsComponent } from './components/business/workspace/employee/products/products.component';
import { ProductTableComponent } from './components/tables/productTable/productTable.component';
import { ProductFormComponent } from './components/business/admin/forms/productForm/productForm.component';
import { EditProductComponent } from './components/business/workspace/employee/editProduct/editProduct.component';
import { ProductBoxComponent } from './components/product/productBox/productBox.component';
import { ProductShowcaseComponent } from './components/product/productShowcase/productShowcase.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProductDetailsComponent } from './components/product/productDetails/productDetails';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OrderModalComponent } from './components/modals/orderModal/orderModal.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemTableComponent } from './components/cart/cartItemTable/cartItemTable.component';
import { OrderComponent } from './components/business/workspace/employee/orders/orders.component';
import { OrdersTableComponent } from './components/tables/ordersTable/ordersTable.component';
import { CategoryTableComponent } from './components/tables/categoryTable/categoryTable.compoent';


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
    EmployeeTableComponent, 
    SpinnerComponent,
    UserDataForm,
    EditEmployeeFormComponent,
    CategoryFormComponent,
    AddCategoryComponent,
    CategoryComponent,
    EditCategoryFormComponent,
    SingleFieldFormComponent,
    ModalComponent,
    EditSubcategoryComponent,
    UserTableComponent,
    CustomerTableComponent,
    EditCustomerComponent,
    AddProductComponent,
    ProductsComponent,
    ProductTableComponent,
    ProductFormComponent,
    EditProductComponent,
    ProductBoxComponent,
    ProductShowcaseComponent,
    PaginationComponent,
    ProductDetailsComponent,
    SearchBarComponent,
    OrderModalComponent,
    CartComponent,
    CartItemTableComponent,
    OrderComponent,
    OrdersTableComponent,
    CategoryTableComponent
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
