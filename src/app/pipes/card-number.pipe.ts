import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {

  transform(value: number[]) {

    const part1 = value.slice(0,4)
    const part2 = value.slice(4,8)
    const part3 = value.slice(8,12)
    const part4 = value.slice(12,16)

  //   const newValue = 
  //  `${(value[0] ? value[0] : "") + (value[1] ? value[1] : "")} / ${(value[2] ? value[2] : "") + (value[3] ? value[3] : "")}`
   return `${part1}  ${part2}  ${part3}  ${part4}` ;
  }

}
