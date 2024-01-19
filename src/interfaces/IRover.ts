import { Direction } from "../enums/Direction";
import { Coordinates } from "../classes/Coordinates";
import { Position } from "../classes/Position";
import { Planete } from "../classes/Planete";

export interface IRover {
    position: Position;

    avancer(): void;
    reculer(): void;
    tournerGauche(): void;
    tournerDroite(): void;
    getCoordinates(): Coordinates;
    getDirection(): Direction;
}
