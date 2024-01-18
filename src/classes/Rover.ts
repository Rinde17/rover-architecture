import { Direction } from "../enums/Direction";
import { IRover } from "../interfaces/IRover";
import { Planete } from "./Planete";
import { Position } from "./Position";
import { Coordonates } from "./Coordonates";

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
                this.position.coordonates.y = (this.position.coordonates.y + 1) % this.planete.height;
                break;
            case Direction.Sud:
                this.position.coordonates.y = (this.position.coordonates.y - 1 + this.planete.height) % this.planete.height;
                break;
            case Direction.Est:
                this.position.coordonates.x = (this.position.coordonates.x + 1) % this.planete.width;
                break;
            case Direction.Ouest:
                this.position.coordonates.x = (this.position.coordonates.x - 1 + this.planete.width) % this.planete.width;
                break;
        }
    }

    reculer() {
        // Logique pour reculer avec une planète toroïdale
        switch (this.position.direction) {
            case Direction.Nord:
                this.position.coordonates.y = (this.position.coordonates.y - 1 + this.planete.height) % this.planete.height;
                break;
            case Direction.Sud:
                this.position.coordonates.y = (this.position.coordonates.y + 1) % this.planete.height;
                break;
            case Direction.Est:
                this.position.coordonates.x = (this.position.coordonates.x - 1 + this.planete.width) % this.planete.width;
                break;
            case Direction.Ouest:
                this.position.coordonates.x = (this.position.coordonates.x + 1) % this.planete.width;
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

    getCoordonnees(): Coordonates {
        return this.position.coordonates;
    }

    getDirection(): Direction {
        return this.position.direction;
    }
}