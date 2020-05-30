import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serach',
  pure: false
})
export class SerachPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    console.log(value);
    return value.filter(res=> {
      return res.studentName.toLowerCase().indexOf(args.toLowerCase()) > -1
    });
  }
  
}

