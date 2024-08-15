import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform { // ng generate pipe percentage
/* ti crea una pipe custom che puoi poi utilizzare qua usata all'interno di  -> event component
 prende in ingresso un numero che sia una stringa o int e ritorna il valore + %.
 nel caso sia una stringa e non finisca con % idem ritorna il valore con %
*/
 
  transform(value: number | string): string {
    if (typeof value === 'number') {
      return `${value}%`;
    } else if (typeof value === 'string' && !value.endsWith('%')) {
      return `${value}%`;
    }
    return value;
  }
}

