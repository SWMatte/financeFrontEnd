import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SummaryDTO } from 'src/app/classes/SummaryDTO';
import { DataServiceBehaviorSubj } from 'src/app/service/dataServiceBehaviorSubj';
import { GraphsService } from 'src/app/service/graphs.service';

@Component({
  selector: 'app-graph-component',
  templateUrl: './graph-component.component.html',
  styleUrls: ['./graph-component.component.css']
})
export class GraphComponentComponent implements OnInit {
  summaryDTO: SummaryDTO = new SummaryDTO();  // per elaborare i dati del grafico
  eventsRecorded!: any[];  // dati sorgente per il grafico
  dataGraph!: SummaryDTO[];  // array di dati ottenuti dal BehaviorSubject
  dataGraph$!: Observable<SummaryDTO[]>;  // Observable del BehaviorSubject
  private subscription!: Subscription;  // Subscription per gestire l'iscrizione

  constructor(private dataServiceBehaviorSubj: DataServiceBehaviorSubj, private cd: ChangeDetectorRef) {
    this.dataGraph$ = this.dataServiceBehaviorSubj.getValue();  // Prendi l'Observable dal servizio
  }

  ngOnInit(): void {
    // Iscrizione all'Observable
    this.subscription = this.dataGraph$.subscribe((data) => {
      if (data.length > 0) {
        this.eventsRecorded = SummaryDTO.sourceData(data);
      }
    });
}

  ngOnDestroy(): void {
    // Disiscrivi per evitare memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }




  // dimensioni del grafico
  view: [number, number] = [700, 370];

  // opzioni per la legenda
  legendTitle: string = 'titoloLegenda';
  legendTitleMulti: string = 'Month';
  legendPosition: any = 'below'; // ['right', 'below']
  legend: boolean = true;

  // didascalie per i campi
  xAxis: boolean = true;  // mostri etichette asse X 
  yAxis: boolean = true; // mostri etichette asse Y 


  yAxisLabel: string = 'descAsseY'; // valorizzi etichetta esterna asse Y
  xAxisLabel: string = 'descAsseX'; // valorizzi etichetta esterna asse X
  showXAxisLabel: boolean = true; // mostri o no etichette
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30; // lunghezza dei caratteri su etichette
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  yAxisTicks: any[] = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000]  // scala sull'asse Y

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  schemeType: any = 'ordinal'; // 'ordinal' or 'linear'

  // activeEntries: any[] = ['Book']
  barPadding: number = 10 // spazio tra le barre
  tooltipDisabled: boolean = false; // passando sopra ti appare il pop-up della descrz

  yScaleMax: number = 9000;

  roundEdges: boolean = true;
}
