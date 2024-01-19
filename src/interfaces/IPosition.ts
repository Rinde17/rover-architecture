import { Direction } from "../enums/Direction";
import { Coordinates } from "../classes/Coordinates";

export interface IPosition {
    coordinates: Coordinates
    direction: Direction;
}