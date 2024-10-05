import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Finance } from 'src/app/classes/Finance';
import { GraphsService } from 'src/app/service/graphs.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {


  constructor(private graphService: GraphsService) {
  }

  finance?: Finance;
  findError: boolean = false;   
  stringError?: string = "";
  ngOnInit(): void {

    this.getResult()


  }


  async getResult() {
    try {
      const response = await firstValueFrom(this.graphService.getFinance());

      if (response.status === 200 && response.body) {
        this.finance = response.body;
        this.findError = false; // Nessun errore
      } else {
        this.findError = true; // Errore generico
        this.stringError = "Errore nel caricamento dei dati.";
      }
    } catch (error: any) {
      this.findError = true;
      if (error.status === 404) {
        this.stringError = "Errore nel caricare la finanza disponibile";
      } else if (error.status === 500) {
        this.stringError = "Errore nel server durante il caricamento della finanza disponibile";
      } else {
        this.stringError = "Errore di rete: impossibile raggiungere il server";
      }
    }
  }
}
 