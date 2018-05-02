import { Pipe, PipeTransform } from '@angular/core';
import { apiUrl } from './api';

@Pipe({
  name: 'storage'
})
export class StoragePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? apiUrl('picture', value) : null;
  }

}
