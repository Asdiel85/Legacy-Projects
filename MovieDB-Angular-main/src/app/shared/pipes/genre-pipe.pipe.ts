import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genrePipe'
})
export class GenrePipePipe implements PipeTransform {

  transform(genres: {id: number, name: string} [], delimeter: string) {
    return genres.map(e => e.name).join(delimeter);
  }


}
