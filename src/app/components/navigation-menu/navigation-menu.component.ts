import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  constructor(  private router: Router) { } // call to the service for method of debit and router to move in the components

  snackBar = inject(MatSnackBar);


  logOut(){
    // open the message after send the event
      this.snackBar.open("Hai effettuato il logout, redirect al login!");
      localStorage.removeItem("token");
      setTimeout(() => {
        this.snackBar.dismiss();
        this.router.navigate(['/login']);
      }, 2500);
     
  }





}

 
 