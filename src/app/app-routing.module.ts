import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormComponent } from './components/form/form.component';
import { DebitComponent } from './components/debit/debit.component';
import { ViewDebitsComponent } from './components/view-debits/view-debits.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
 { path: 'home', component: HomeComponent },
 { path: 'form', component: FormComponent },
 { path: 'debit', component: DebitComponent },
 { path: 'viewDebit', component: ViewDebitsComponent },
 { path: 'register', component: RegisterComponent }

 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
