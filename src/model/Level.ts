export class Level{
    stage: number;
    substage: number;
    progression: number = 0;
    constructor(stage: number, substage: number){
        this.stage = stage;
        this.substage = substage;
    }
}