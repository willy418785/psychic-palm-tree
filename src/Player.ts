export class Player{
    hp: number;
    maxHp: number;
    atk: number;
    maxAtk: number = 100;
    def: number;
    maxDef: number = 100;
    itemList: Array<number> = [];
    maxNumOfItems: number = 5;
    money: number = 0;
    lux: number;
    maxLux: number = 100;
    constructor(hp: number, atk: number, def: number, lux: number){
        this.hp = hp;
        this.maxHp = hp;
        this.atk = atk;
        this.def = def;
        this.lux = lux;
    }
}