import { Component, OnInit } from '@angular/core';
import { GraphsService } from '../../service/graphs.service';
import { Summary } from 'src/app/classes/Summary';
import { Observable } from 'rxjs';
import { Finance } from 'src/app/classes/Finance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
/* QUESTA HOME DOVREI POPOLARLA CON QUALCOSA COME PAGINA DI ATTERRAGGIO*/

  /**
   * ! Important message
   * * normal message
   * ? questionable message
   * TODO  things to do 
   * @param debitService  
   */

	constructor(private graphService: GraphsService) {
	}
  ngOnInit(): void {
    
  }

 
 



}
