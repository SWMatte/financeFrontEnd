export class DebitPaymentDTO {
  debitID?: number;
  data?: Date; // `LocalDate` in Java è simile a `Date` in TypeScript
  description?: string;
  valueStart?: number; // Usa `?` per indicare che può essere `undefined`
  valueFinish?: number;
  settled?: boolean = false; // Valore predefinito per `Boolean`

  constructor(
    debitID?: number,
    data?: Date,
    description?: string,
    valueStart?: number,
    valueFinish?: number,
    settled: boolean = false
  ) {
    this.debitID = debitID;
    this.data = data;
    this.description = description;
    this.valueStart = valueStart;
    this.valueFinish = valueFinish;
    this.settled = settled;
  }
}
 
