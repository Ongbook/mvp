/* Filtro/Pipe de formatação do cnpj
*
* @author Fabio humberto
* @since 1.0.0
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'cnpj'
})
export class Cnpj implements PipeTransform {

   transform(cnpj: any): string {
       let idTexto: string = String(cnpj);

       if (idTexto.length !== 18) {
           return idTexto;
       }

       return idTexto.substr(0, 2) + '.' +
              idTexto.substr(2, 5) + '.' + 
              idTexto.substr(5, 8) + '/' + 
              idTexto.substr(8, 11) + '-' + 
              idTexto.substr(11, 13);
   }
}
