import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageFormat'
})
export class PercentageFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value.replace(/[^\d.-]/g, '')); // Rimuove simboli non numerici
    }
    return value ? `${value.toFixed(2)}%` : '';
  }

}
