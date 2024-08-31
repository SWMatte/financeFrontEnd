import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Summary } from 'src/app/classes/Summary';
import { GraphsService } from 'src/app/service/graphs.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; // Importa MatPaginator
 
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summary: Summary[] = [];
  findError: boolean = false;
  stringError: string = "";
  
   dataSource = new MatTableDataSource<Summary>(this.summary);

   displayedColumns: string[] = [
    'summaryId', 
    'description', 
    'typeEvent', 
    'value', 
    'euroSaved', 
    'percentageSaved', 
    'debit', 
    'data'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Aggiungi MatPaginator

  constructor(private graphService: GraphsService) {}

  ngOnInit(): void {
    this.summaryResult();
  }

  async summaryResult() {
    try {
      const response = await firstValueFrom(this.graphService.getListDebts());

      if (response.status === 200 && response.body) {
        this.summary = response.body;
        this.dataSource.data = this.summary;  // Update dataSource with fetched data
        this.dataSource.paginator = this.paginator; // Assegna il paginator al dataSource
        this.findError = false; // No error
      } else {
        this.findError = true; // Generic error
        this.stringError = "Errore nel caricamento dei dati.";
      }
    } catch (error: any) {
      this.findError = true;
      if (error.status === 404) {
        this.stringError = "Errore 404: Risorsa non trovata";
      } else if (error.status === 500) {
        this.stringError = "Errore 500: Errore interno del server";
      } else {
        this.stringError = "Errore di rete: impossibile raggiungere il server";
      }
    }
  }
}
