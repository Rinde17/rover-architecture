import { Direction } from "../enums/Direction";
import { Coordonates } from "../classes/Coordonates";

export interface IPosition {
    coordonates: Coordonates
    direction: Direction;
}