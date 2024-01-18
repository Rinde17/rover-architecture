import { IPosition } from "../interfaces/IPosition";
import { Coordonates } from "./Coordonates";
import { Direction } from "../enums/Direction";

export class Position implements IPosition {
    coordonates: Coordonates;
    direction: Direction;

    constructor(coordonnees: Coordonates, direction: Direction) {
        this.coordonates = coordonnees;
        this.direction = direction;
    }
}