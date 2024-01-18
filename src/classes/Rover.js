"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rover = void 0;
const Direction_1 = require("../enums/Direction");
class Rover {
    constructor(position, planete) {
        this.position = position;
        this.planete = planete;
    }
    avancer() {
        // Logique pour avancer avec une planète toroïdale
        switch (this.position.direction) {
            case Direction_1.Direction.Nord:
                this.position.coordonates.y = (this.position.coordonates.y + 1) % this.planete.height;
                break;
            case Direction_1.Direction.Sud:
                this.position.coordonates.y = (this.position.coordonates.y - 1 + this.planete.height) % this.planete.height;
                break;
            case Direction_1.Direction.Est:
                this.position.coordonates.x = (this.position.coordonates.x + 1) % this.planete.width;
                break;
            case Direction_1.Direction.Ouest:
                this.position.coordonates.x = (this.position.coordonates.x - 1 + this.planete.width) % this.planete.width;
                break;
        }
    }
    reculer() {
        // Logique pour reculer avec une planète toroïdale
        switch (this.position.direction) {
            case Direction_1.Direction.Nord:
                this.position.coordonates.y = (this.position.coordonates.y - 1 + this.planete.height) % this.planete.height;
                break;
            case Direction_1.Direction.Sud:
                this.position.coordonates.y = (this.position.coordonates.y + 1) % this.planete.height;
                break;
            case Direction_1.Direction.Est:
                this.position.coordonates.x = (this.position.coordonates.x - 1 + this.planete.width) % this.planete.width;
                break;
            case Direction_1.Direction.Ouest:
                this.position.coordonates.x = (this.position.coordonates.x + 1) % this.planete.width;
                break;
        }
    }
    tournerGauche() {
        switch (this.position.direction) {
            case Direction_1.Direction.Nord:
                this.position.direction = Direction_1.Direction.Ouest;
                break;
            case Direction_1.Direction.Sud:
                this.position.direction = Direction_1.Direction.Est;
                break;
            case Direction_1.Direction.Est:
                this.position.direction = Direction_1.Direction.Nord;
                break;
            case Direction_1.Direction.Ouest:
                this.position.direction = Direction_1.Direction.Sud;
                break;
        }
    }
    tournerDroite() {
        switch (this.position.direction) {
            case Direction_1.Direction.Nord:
                this.position.direction = Direction_1.Direction.Est;
                break;
            case Direction_1.Direction.Sud:
                this.position.direction = Direction_1.Direction.Ouest;
                break;
            case Direction_1.Direction.Est:
                this.position.direction = Direction_1.Direction.Sud;
                break;
            case Direction_1.Direction.Ouest:
                this.position.direction = Direction_1.Direction.Nord;
                break;
        }
    }
    getCoordonnees() {
        return this.position.coordonates;
    }
    getDirection() {
        return this.position.direction;
    }
}
exports.Rover = Rover;
