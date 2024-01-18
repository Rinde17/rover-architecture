import { Coordinates } from "./Coordinates";
import { IObstacle } from "../interfaces/IObstacle";

export class Obstacle implements IObstacle {
    coordonates: Coordinates;

    constructor(coordonates: Coordinates) {
        this.coordonates = coordonates;
    }

    getCoordonnees(): Coordinates {
        return this.coordonates;
    }

}