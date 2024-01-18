import { ICoordinates } from "../interfaces/ICoordinates";

export class Coordonates implements ICoordinates {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }
}