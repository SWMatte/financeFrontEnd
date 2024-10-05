import { Type } from './Type';
export class Summary {


   registroEventiId?: number;
   descrizione?: string;
   data?: Date;
   tipoEvento?: Type; // Usa `?` per indicare che può essere `undefined`
   valoreInserito?: number;
   euroRisparmiati?: number;
   euroDisponibili?:string
   percentualeRisparmio?: number;


  constructor(summaryId: number,description: string, data:Date,typeEvent: Type,  value: number, euroSaved: number,euroAvailable:string,percentageSaved:number ) {
   this.registroEventiId=summaryId;
   this.descrizione=description;
   this.data=data;
    this.tipoEvento=typeEvent;
    this.valoreInserito=value;
    this.euroRisparmiati=euroSaved;
    this.euroDisponibili= euroAvailable;
    this.percentualeRisparmio=percentageSaved;
  }

}