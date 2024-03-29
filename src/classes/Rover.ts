import { Direction } from "../enums/Direction";
import { IRover } from "../interfaces/IRover";
import { Position } from "./Position";
import { Coordinates } from "./Coordinates";
import { Planete } from "./Planete";

export class Rover implements IRover {
    position: Position;
    planete: Planete;

    constructor(position: Position, planete: Planete) {
        this.position = position;
        this.planete = planete;
    }

    avancer() {
        // Logique pour avancer avec une planète toroïdale
        switch (this.position.direction) {
            case Direction.Nord:
                this.position.coordinates.y =
                    (this.position.coordinates.y + 1) % this.planete.height;
                break;
            case Direction.Sud:
                this.position.coordinates.y =
                    (this.position.coordinates.y -
                        1 +
                        this.planete.height) %
                    this.planete.height;
                break;
            case Direction.Est:
                this.position.coordinates.x =
                    (this.position.coordinates.x + 1) % this.planete.width;
                break;
            case Direction.Ouest:
                this.position.coordinates.x =
                    (this.position.coordinates.x - 1 + this.planete.width) %
                    this.planete.width;
                break;
        }
    }

    reculer() {
        // Logique pour reculer avec une planète toroïdale
        switch (this.position.direction) {
            case Direction.Nord:
                this.position.coordinates.y =
                    (this.position.coordinates.y -
                        1 +
                        this.planete.height) %
                    this.planete.height;
                break;
            case Direction.Sud:
                this.position.coordinates.y =
                    (this.position.coordinates.y + 1) % this.planete.height;
                break;
            case Direction.Est:
                this.position.coordinates.x =
                    (this.position.coordinates.x - 1 + this.planete.width) %
                    this.planete.width;
                break;
            case Direction.Ouest:
                this.position.coordinates.x =
                    (this.position.coordinates.x + 1) % this.planete.width;
                break;
        }
    }

    tournerGauche() {
        switch (this.position.direction) {
            case Direction.Nord:
                this.position.direction = Direction.Ouest;
                break;
            case Direction.Sud:
                this.position.direction = Direction.Est;
                break;
            case Direction.Est:
                this.position.direction = Direction.Nord;
                break;
            case Direction.Ouest:
                this.position.direction = Direction.Sud;
                break;
        }
    }

    tournerDroite() {
        switch (this.position.direction) {
            case Direction.Nord:
                this.position.direction = Direction.Est;
                break;
            case Direction.Sud:
                this.position.direction = Direction.Ouest;
                break;
            case Direction.Est:
                this.position.direction = Direction.Sud;
                break;
            case Direction.Ouest:
                this.position.direction = Direction.Nord;
                break;
        }
    }

    getCoordinates(): Coordinates {
        return this.position.coordinates;
    }

    getDirection(): Direction {
        return this.position.direction;
    }

    getNextPosition(): Coordinates {
        const coordinatesCloned = this.position.coordinates.clone(); // Supposons que vous avez une méthode clone() dans la classe Coordinates

        switch (this.position.direction) {
            case Direction.Nord:
                coordinatesCloned.y =
                    (coordinatesCloned.y + 1) % this.planete.height;
                break;
            case Direction.Sud:
                coordinatesCloned.y =
                    (coordinatesCloned.y - 1 + this.planete.height) %
                    this.planete.height;
                break;
            case Direction.Est:
                coordinatesCloned.x =
                    (coordinatesCloned.x + 1) % this.planete.width;
                break;
            case Direction.Ouest:
                coordinatesCloned.x =
                    (coordinatesCloned.x - 1 + this.planete.width) %
                    this.planete.width;
                break;
        }

        return coordinatesCloned;
    }

    private getBackwardPosition(): Coordinates {
        const coordinatesCloned = this.position.coordinates.clone();

        switch (this.position.direction) {
            case Direction.Nord:
                coordinatesCloned.y =
                    (coordinatesCloned.y - 1 + this.planete.height) %
                    this.planete.height;
                break;
            case Direction.Sud:
                coordinatesCloned.y =
                    (coordinatesCloned.y + 1) % this.planete.height;
                break;
            case Direction.Est:
                coordinatesCloned.x =
                    (coordinatesCloned.x - 1 + this.planete.width) %
                    this.planete.width;
                break;
            case Direction.Ouest:
                coordinatesCloned.x =
                    (coordinatesCloned.x + 1) % this.planete.width;
                break;
        }

        return coordinatesCloned;
    }

    checkObstacleForward(): boolean {
        const nextPosition = this.getNextPosition();
        return this.planete.hasObstacleAtPosition(
            nextPosition
        );
    }

    checkObstacleBackward(): boolean {
        const backwardPosition = this.getBackwardPosition();
        return this.planete.hasObstacleAtPosition(
            backwardPosition
        );
    }
}
