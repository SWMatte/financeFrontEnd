export class EventRegistrationDTO{

    private _description!: string;

    private _value!: String;

    private _percentageSaveMoney!: String;
   
    private _savedMoney!: boolean;
 
    private _objective!: boolean;
    
    private _typeEvent!: Type;


    public get savedMoney(): boolean {
        return this._savedMoney;
    }
    public set savedMoney(value: boolean) {
        this._savedMoney = value;
    }
    public get objective(): boolean {
        return this._objective;
    }
    public set objective(value: boolean) {
        this._objective = value;
    }
    public get typeEvent(): Type {
        return this._typeEvent;
    }
    public set typeEvent(value: Type) {
        this._typeEvent = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get value(): String {
        return this._value;
    }
    public set value(value: String) {
        this._value = value;
    }
    public get percentageSaveMoney(): String {
        return this._percentageSaveMoney;
    }
    public set percentageSaveMoney(value: String) {
        this._percentageSaveMoney = value;
    }
}

enum Type {
    SPESA,
    ENTRATA
  }

  