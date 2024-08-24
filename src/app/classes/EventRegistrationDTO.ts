import { Type } from "./Type";

export class EventRegistrationDTO {

    private description!: string;

    private value!: String;

    private percentageSaveMoney!: String;

    private savedMoney!: boolean;

    private objective!: boolean;

    private typeEvent!: Type;
   

  public getDescription(): string {
    return this.description;
  }

  public getValue(): String {
    return this.value;
  }

  public getPercentageSaveMoney(): String {
    return this.percentageSaveMoney;
  }

  public getSavedMoney(): boolean {
    return this.savedMoney;
  }

  public getObjective(): boolean {
    return this.objective;
  }

  public getTypeEvent(): Type {
    return this.typeEvent;
  }

 

    constructor(description: string,value: String, percentageSaveMoney:String,savedMoney: boolean,objective: boolean,  typeEvent: Type) {
        this.description=description;
        this.value=value;
        this.percentageSaveMoney=percentageSaveMoney;
        this.savedMoney=savedMoney;
        this.objective=objective;
        this.typeEvent=typeEvent;
    }


}



