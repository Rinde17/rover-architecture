import { IPlanete } from "../interfaces/IPlanete";

export class Planete implements IPlanete {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}