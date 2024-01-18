import { Direction } from "../enums/Direction";
import { Coordonates } from "../classes/Coordonates";
import { Position } from "../classes/Position";
import { Planete } from "../classes/Planete";

export interface IRover {
    position: Position;
    planete: Planete;

    avancer(): void;
    reculer(): void;
    tournerGauche(): void;
    tournerDroite(): void;
    getCoordonnees(): Coordonates;
    getDirection(): Direction;
}