import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySplit'
})
export class ArraySplitPipe implements PipeTransform {

  transform(category: string [], delimiter: string) {
    category.slice(0, 1);
    return category.join(delimiter);

  }
}
