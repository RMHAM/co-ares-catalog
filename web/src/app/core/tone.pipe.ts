import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tone',
})
export class TonePipe implements PipeTransform {
  transform(value: string): string {
    if (!Number.isNaN(Number(value))) {
      return Number(value).toFixed(1);
    }
    return value;
  }
}
