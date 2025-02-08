import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DebitPaymentDTO } from 'src/app/classes/DebitPaymentDTO';
import { DebitService } from 'src/app/service/debit.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DebitsInfoComponent } from '../debits-info/debits-info.component';
import { SpreadOutPaymentsComponent } from '../spread-out-payments/spread-out-payments.component';

@Component({
  selector: 'app-view-debits',
  templateUrl: './view-debits.component.html',
  styleUrls: ['./view-debits.component.css']
})
export class ViewDebitsComponent implements OnInit {


  readonly dialog = inject(MatDialog);

  constructor(private debitService: DebitService) { }
  completeDebts: DebitPaymentDTO[] = [];  // Variabile per memorizzare i dati
  numbersOfDebts: string = ""

  numbersOfDebts_: number = 0;
  numbersOfCompleteDebts:string ="";

  numbersOfCompleteDebts_: number = 0;

  
  ngOnInit(): void {
    this.getCompletedDebts(); // tutti i debiti presenti a backend saldati e non

  }


  async getCompletedDebts(): Promise<void> {
    try {
      const response = await firstValueFrom(this.debitService.getCompletedDebts());

      this.completeDebts = response;

      if (this.completeDebts.length > 0) {
        this.completeDebts.forEach(element => {
          new DebitPaymentDTO(element.debitID, element.data, element.description, element.valueStart, element.valueFinish, element.settled)
        });
      }

    } catch (error) {
      // console.log(error + "a")
    }
    this.getNumbersOfTotalDebts();
    this.getNumbersOfFinishDebts();
  }

  async moreInfo(debitID: number) {

    const dialogRef = this.dialog.open(DebitsInfoComponent, {
      data: { debitID: debitID }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  async getNumbersOfTotalDebts() {
    try {
      const response = await firstValueFrom(this.debitService.getNumbersOfTotalDebts());
      if (response == null || response == undefined) {
        this.numbersOfDebts ="Errore nel conteggio dei debiti";
      }else{
        this.numbersOfDebts_ = response;
        this.numbersOfDebts= "Numero di debiti : " +this.numbersOfDebts_
      }

    } catch (error) {}
  }


  async getNumbersOfFinishDebts() {
    try {
      const response = await firstValueFrom(this.debitService.getNumbersOfFinishDebts());
      if (response == null || response == undefined) {
        this.numbersOfCompleteDebts ="Errore nel conteggio dei debiti";
      }else{
        this.numbersOfCompleteDebts_ = response;
        this.numbersOfCompleteDebts= "Numero di debiti saldati: " +this.numbersOfCompleteDebts_
      }

      console.log(this.numbersOfCompleteDebts)

    } catch (error) {}
  }

  spreadPayments() {
   
      const dialogRef = this.dialog.open(SpreadOutPaymentsComponent, {});
    
  }
}
