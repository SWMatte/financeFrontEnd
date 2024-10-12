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
import { HttpClientModule } from '@angular/common/http';
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
import { ABarComponent } from './components/a-bar/a-bar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphComponentComponent } from './components/graph-component/graph-component.component';
import { ViewDebitsComponent } from './components/view-debits/view-debits.component';
   
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
    ABarComponent,
    GraphComponentComponent,
    ViewDebitsComponent

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
    FormsModule
  ],
  providers: [
    { provide: NativeDateAdapter, useClass: NativeDateAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
