import { Type } from './Type';
export class Summary {


   summaryId?: number;
   description?: string;
   data?: Date;
   typeEvent?: Type; // Usa `?` per indicare che può essere `undefined`
   value?: number;
   euroSaved?: number;
   percentageSaved?: number;
   debit?:string;

 

   constructor(summaryId: number,description: string, data:Date,typeEvent: Type,  value: number, euroSaved: number, percentageSaved:number, debit:string) {
    this.summaryId=summaryId;
    this.description=description;
    this.data=data;
    this.typeEvent=typeEvent;
    this.value=value;
    this.euroSaved=euroSaved;
    this.percentageSaved=percentageSaved;
    this.debit=debit;
 }

}