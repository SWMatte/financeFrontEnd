import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importa FormsModule



import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormComponent } from './components/form/form.component';
import { EventComponent } from './components/event/event.component';
import { PercentagePipe } from './percentage.pipe';
import { DebitComponent } from './components/debit/debit.component';
import { FinanceComponent } from './components/finance/finance.component';
import { SummaryComponent } from './components/summary/summary.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphComponentComponent } from './components/graph-component/graph-component.component';
import { ViewDebitsComponent } from './components/view-debits/view-debits.component';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { DebitsInfoComponent } from './components/debits-info/debits-info.component';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticatorService } from './service/authenticator.service';
import { RegisterComponent } from './components/register/register.component';
import { SpreadOutPaymentsComponent } from './components/spread-out-payments/spread-out-payments.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationMenuComponent,
    LoginComponent,
    FormComponent,
    EventComponent,
    PercentagePipe,
    DebitComponent,
    FinanceComponent,
    SummaryComponent,
    GraphComponentComponent,
    ViewDebitsComponent,
    DebitsInfoComponent,
    RegisterComponent,
    SpreadOutPaymentsComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    NgxChartsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [
    { provide: NativeDateAdapter, useClass: NativeDateAdapter }, {provide: HTTP_INTERCEPTORS , useClass: AuthenticatorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
