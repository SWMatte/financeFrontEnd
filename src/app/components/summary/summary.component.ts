import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Summary } from 'src/app/classes/Summary';
import { GraphsService } from 'src/app/service/graphs.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SummaryDTO } from 'src/app/classes/SummaryDTO';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DataServiceBehaviorSubj } from 'src/app/service/dataServiceBehaviorSubj';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnChanges{

  summary: Summary[] = [];
  findError: boolean = false;
  stringError: string = "";
  dataSource = new MatTableDataSource<Summary>(this.summary); // genera una tabella di tipo classe Summary valorizzata con gli elementi di this.summary assegnato questo a datasource  anche le colonne sono legate ai nomi che ritornano dal backckend
  displayedColumns: string[] = [];
  selectedDate!: Date | null;
  month:string="";   
  graph!: SummaryDTO;
  dataGraph: SummaryDTO[] = [];
  filterPanelOpen: string =""; // Stato per mostrare/nascondere il pannello dei filtri
  counterFiltered : number = 0;
  filteredData: Summary[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator; //viewchild mi permette di mostrare paginator ovvero i numeri di pagina solo dopo che è stata istanziata la vista  in quanto è assegnata alla variabile paginator

  constructor(private graphService: GraphsService,
    private dataServiceBehaviorSubj: DataServiceBehaviorSubj
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    changes['month']
  }

  ngOnInit(): void {
    this.summaryResult();
    this.graph = new SummaryDTO();
    this.filteredData = [...this.summary]; 
  }

  async summaryResult() {
    try {
      
      const response = await firstValueFrom(this.graphService.getListEvent(this.month));
      if (response.status === 200 && response.body) {
        this.summary = response.body;

        this.dataSource.data = this.summary;   // questi solo i valori effettivi della tabella 

        this.dataSource.paginator = this.paginator;  // questo permette di gestire la paginazione  e i valori derivano da :   <mat-paginator [pageSize]="10" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator> che situato nell html 
        if (this.summary.length > 0) {  // qua prendiamo tutte le key dell'array quindi se aumentiano in maniera dinamica aumentano le colonne
          this.displayedColumns = this.orderValuesTable();
        }
        /**
         * Qui popoliamo il behavior subject SOLO SE l'array lunghezza > 1, altrimenti problema eccezione grafico undefined
         * per ogni valore dell'array ottenuto dal backend richiamiamo un metodo del DTO, che popola l'array che useremo nel grafico con solo i valori di tipo e value
         * Richiamiamo il behavior subject DataServiceBehaviorSubj  per assegnargli l'array
         */
        if (this.summary.length > 0) {
          if (SummaryDTO.graphArray.length == 0) {  
            this.summary.forEach(value => SummaryDTO.toGraph(value.tipoEvento?.toString(), value.valoreInserito))  
            this.dataServiceBehaviorSubj.setGraphArray(SummaryDTO.graphArray)
          } else { 
            SummaryDTO.graphArray=[]
            this.summary.forEach(value => SummaryDTO.toGraph(value.tipoEvento?.toString(), value.valoreInserito))
            this.dataServiceBehaviorSubj.setGraphArray(SummaryDTO.graphArray)
             
          }
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
      case 'valoreInserito':
        return `€${value}`;
      case 'euroDisponibili':
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
        valoreInserito: "",
        descrizione:"",
        data:"" ,
        euroDisponibili: ""
      }
    ]; 
      return Object.keys(summary[0]);      
}
 
async dateSelected(event: MatDatepickerInputEvent<Date>) {
  this.selectedDate = event.value;
  if (this.selectedDate) {
    const monthNumber: number = this.selectedDate.getMonth() + 1;
    this.month = monthNumber.toString();

    // Richiama summaryResult() per ottenere i dati aggiornati
    await this.summaryResult();
  }
}

async  resetDate(){
  this.month="";
  this.selectedDate=null;
  
  await this.summaryResult();
}

/**
 * 
 * @param column  in base alla colonna che viene cliccata, si fa un check sulla variaibile filterPanelOpen se è uguale al nome della colonna si chiude altrimenti si apre puoi fare un check mettendo console log
 * 
 */
toggleFilterPanel(column: string) {
  
  if (this.filterPanelOpen === column) {
    // Se la colonna è già aperta, chiudi il filtro
    this.filterPanelOpen = "";
    this.resetDataSource();
  } else {
    // Altrimenti, apri il filtro per la colonna cliccata
    this.filterPanelOpen = column;
  }
}

 
applyFilter(selectedTipo: string) {
  if(this.filterPanelOpen == ""){
    this.dataSource.data = this.summary
  } else{
    this.filteredData = this.summary.filter(item => item.tipoEvento === selectedTipo);
    this.dataSource.data = this.filteredData

  }
 }

 resetDataSource() {
  this.dataSource.data = this.summary;
 }


 
}
   