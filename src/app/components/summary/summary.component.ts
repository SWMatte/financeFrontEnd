import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Summary } from 'src/app/classes/Summary';
import { GraphsService } from 'src/app/service/graphs.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summary: Summary[] = [];
   findError: boolean = false;
  stringError: string = "";
  dataSource = new MatTableDataSource<Summary>(this.summary); // genera una tabella di tipo classe Summary valorizzata con gli elementi di this.summary assegnato questo a datasource  anche le colonne sono legate ai nomi che ritornano dal backckend
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator; //viewchild mi permette di mostrare paginator ovvero i numeri di pagina solo dopo che è stata istanziata la vista  in quanto è assegnata alla variabile paginator

  constructor(private graphService: GraphsService) {}

  ngOnInit(): void {
    this.summaryResult();
  }

  async summaryResult() {
    try {
      const response = await firstValueFrom(this.graphService.getListDebts());

      if (response.status === 200 && response.body) {
        this.summary = response.body;
         this.dataSource.data = this.summary;   // questi solo i valori effettivi della tabella 

        this.dataSource.paginator = this.paginator;  // questo permette di gestire la paginazione  e i valori derivano da :   <mat-paginator [pageSize]="10" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator> che situato nell html 

         if (this.summary.length > 0) {  // qua prendiamo tutte le key dell'array quindi se aumentiano in maniera dinamica aumentano le colonne
          this.displayedColumns = this.orderValuesTable();
        }

        this.findError = false;
      } else {
        this.findError = true;
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

  formatCellValue(value: any, column: string): string {  /* filtro in base alle colonne in ingresso se sono una di quelle aggiungo % o € davanti al valore*/
    if (value === null || value === undefined) {
      return '';  
    }
    switch (column) {
      case 'euroRisparmiati':
        return `€${value}`;
      case 'percentualeRisparmio':
        return `${value}%`;
      case 'valore':
        return `€${value}`;
      default:
        return value;
    }
  }


  orderValuesTable(){ /* metodo che permette di ordinare le colonne in maniera custom da modificare in caso di aggiunta di nuove colonne*/
    const summary = [
      {
        registroEventiId:"",
        tipoEvento: "",
        euroRisparmiati:  "",
        percentualeRisparmio: "",
        valore: "",
        descrizione:"",
        data:"" ,
        debito: ""
      }
    ]; 
      return Object.keys(summary[0]);      
}
 


}
