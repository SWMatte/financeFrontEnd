
export class SummaryDTO {
    tipoEvento?: string;  // Cambiato da String a string
    valoreInserito?: number;
    static graphArray: SummaryDTO[] = [];

    constructor(typeEvent?: string, value?: number) {
        this.tipoEvento = typeEvent || undefined;
        this.valoreInserito = value || 0;
    }

    static toGraph(tipoEvento: string = "", valoreInserito: number = 0) {
        const newGraphData = new SummaryDTO(tipoEvento, valoreInserito);
        this.graphArray.push(newGraphData);
        return newGraphData;
    }


    static sourceData(dataGraph: SummaryDTO[]): any[] {
        let entrataTotale: number = 0;
        let spesaTotale: number = 0;
        let debitoTotale: number = 0;

        for (let element of dataGraph) {
            if (element.tipoEvento === 'ENTRATA') {
                entrataTotale += element.valoreInserito ?? 0;  // Usa 0 se valoreInserito è undefined
            } else if (element.tipoEvento === 'SPESA') {
                spesaTotale += element.valoreInserito ?? 0;
            } else if (element.tipoEvento === 'DEBITO') {
                debitoTotale += element.valoreInserito ?? 0;
            }
        }

        let array = [
            { "name": 'ENTRATA', "value": entrataTotale ?? 0 },
            { "name": 'SPESA', "value": spesaTotale ?? 0 },
            { "name": 'DEBITO', "value": debitoTotale ?? 0 }
        ];

        return array;
    }


}