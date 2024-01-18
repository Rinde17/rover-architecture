import { IPosition } from "../interfaces/IPosition";
import { Coordinates } from "./Coordinates";
import { Direction } from "../enums/Direction";

export class Position implements IPosition {
    coordinates: Coordinates;
    direction: Direction;

    constructor(coordinates: Coordinates, direction: Direction) {
        this.coordinates = coordinates;
        this.direction = direction;
    }
}