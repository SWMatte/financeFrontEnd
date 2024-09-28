import { Component } from '@angular/core';
import { productSales, productSalesMulti } from 'src/app/product'
@Component({
  selector: 'app-a-bar',
  templateUrl: './a-bar.component.html',
  styleUrls: ['./a-bar.component.css']
})
export class ABarComponent {
  // dati di sorgente derivanti da una classe 
  productSales!: any[]
  productSalesMulti!: any[]
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

   yAxisTicks: any[] = [100, 1000, 2000, 5000, 7000, 10000]  // scala sull'asse Y

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  
  schemeType:any = 'ordinal' ; // 'ordinal' or 'linear'

  activeEntries: any[] = ['Book']
  barPadding: number = 10 // spazio tra le barre
  tooltipDisabled: boolean = false; // passando sopra ti appare il pop-up della descrz

  yScaleMax: number = 9000;

  roundEdges: boolean = true;

  constructor() { Object.assign(this, { productSales, productSalesMulti }); }

  ngOnInit(): void {
  }

  onSelect(event: any) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
  }
}
