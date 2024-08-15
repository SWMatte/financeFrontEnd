export class DebitPayment {
    
    private description!: string;
    private valueStart!: number;


    constructor(description: string, valueStart: number) {
        this.description = description;
        this.valueStart = valueStart;
    }


    
  public getDescription(): string {
    return this.description;
  }

  public getValueStart(): number {
    return this.valueStart;
  }

}
