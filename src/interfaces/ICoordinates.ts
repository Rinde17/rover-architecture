import {Coordinates} from "../classes/Coordinates";

export interface ICoordinates {
    x: number;
    y: number;

    clone(): Coordinates
}