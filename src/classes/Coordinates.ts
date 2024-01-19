import { ICoordinates } from "../interfaces/ICoordinates";

export class Coordinates implements ICoordinates {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }

    clone(): Coordinates {
        return new Coordinates(this.x, this.y);
    }

    // Méthode pour comparer si deux coordonnées sont égales
    isEqual(otherCoordinates: Coordinates): boolean {
        return this.x === otherCoordinates.x && this.y === otherCoordinates.y;
    }
}