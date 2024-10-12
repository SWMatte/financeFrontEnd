import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DebitPaymentDTO } from 'src/app/classes/DebitPaymentDTO';
import { DebitService } from 'src/app/service/debit.service';
@Component({
  selector: 'app-view-debits',
  templateUrl: './view-debits.component.html',
  styleUrls: ['./view-debits.component.css']
})
export class ViewDebitsComponent implements OnInit {



  constructor(private debitService: DebitService) { }
  completeDebts: DebitPaymentDTO[] = [];  // Variabile per memorizzare i dati

 



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
      console.log(error)

    }
  }

  async  moreInfo(debitID: number) {
  

     const response = await firstValueFrom(this.debitService.getMoreinfoDebts(debitID));
     console.log(response.body)
  }

}
