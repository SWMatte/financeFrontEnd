import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DebitoDTO } from 'src/app/classes/DebitoDTO';
import { DebitPaymentDTO } from 'src/app/classes/DebitPaymentDTO';
import { DebitService } from 'src/app/service/debit.service';

@Component({
  selector: 'app-debits-info',
  templateUrl: './debits-info.component.html',
  styleUrls: ['./debits-info.component.css']
})
export class DebitsInfoComponent implements OnInit{
  readonly dialog = inject(MatDialog);

  constructor(private debitService: DebitService, @Inject(MAT_DIALOG_DATA) public data: { debitID: number }) { }
 
  defaultMessage : string = "Non hai dedicato manco 1 € per questo debito";
  completeDebts!: DebitoDTO;  // Variabile per memorizzare i dati


  ngOnInit(): void {
   this.moreInfo(); // per inizializzare il componente e mostrare i campi nel dialog
 }
  
  async  moreInfo() {
    const response = await firstValueFrom(this.debitService.getMoreinfoDebts(this.data.debitID));  
    if (response && response.body) {
      this.completeDebts = new DebitoDTO(
        response.body.dataInserimento !== undefined && response.body.dataInserimento !== null ? response.body.dataInserimento : "", 
        response.body.descrizione !== undefined && response.body.descrizione !== null ? response.body.descrizione : this.defaultMessage, 
        response.body.debitoSaldato !== undefined && response.body.debitoSaldato !== null ? response.body.debitoSaldato : false, 
        response.body.saldoResiduo !== undefined && response.body.saldoResiduo !== null ? response.body.saldoResiduo : 0, 
        response.body.valoreDebito !== undefined && response.body.valoreDebito !== null ? response.body.valoreDebito : 0, 
        response.body.euroDedicati !== undefined && response.body.euroDedicati !== null ? response.body.euroDedicati : 0
      );
    } 
    
  }



}
