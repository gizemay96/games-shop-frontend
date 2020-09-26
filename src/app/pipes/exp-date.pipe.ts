import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expDate'
})
export class ExpDatePipe implements PipeTransform {

  transform(value?: number , index?){
   if(value){
    const newValue = 
    `${(value[0] ? value[0] : "") + (value[1] ? value[1] : "")} / ${(value[2] ? value[2] : "") + (value[3] ? value[3] : "")}`
    return newValue;
   }else {
     return "";
   }
  }

}
