import { IPlanete } from "../interfaces/IPlanete";
import {Obstacle} from "./Obstacle";
import {Coordinates} from "./Coordinates";

export class Planete implements IPlanete {
    width: number;
    height: number;

    obstacles: Obstacle[] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    setObstacles(obstacles: Obstacle[]) {
        this.obstacles = obstacles;
    }

    // Vérifie si un obstacle se trouve à la position donnée
    hasObstacleAtPosition(coordinates: Coordinates): boolean {
        return this.obstacles.some(obstacle => obstacle.getCoordonnees().isEqual(coordinates));
    }

}