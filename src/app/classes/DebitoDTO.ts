export class DebitoDTO{


   
        public dataInserimento?: string; 
        public descrizione?: string;
        public debitoSaldato?: boolean;  
        public saldoResiduo?: number;  
        public valoreDebito?: number;
        public euroDedicati?: number;

      
        constructor(dataInserimento: string, descrizione : string , debitoSaldato : boolean , saldoResiduo : number , valoreDebito: number , euroDedicati : number){
                this.dataInserimento = dataInserimento;
                this.descrizione = descrizione;
                this.debitoSaldato = debitoSaldato;
                this.saldoResiduo = saldoResiduo;
                this.valoreDebito =valoreDebito;
                this.euroDedicati = euroDedicati;

        }

  
}