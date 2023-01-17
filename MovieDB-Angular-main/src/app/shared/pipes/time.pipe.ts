import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(minutes: number, ...args: unknown[]) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return (hours + 'h' + ' ' + mins + 'm');
  }

}
