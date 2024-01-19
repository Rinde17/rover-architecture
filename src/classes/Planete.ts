import { IPlanete } from "../interfaces/IPlanete";
import { Obstacle } from "./Obstacle";
import { Coordinates } from "./Coordinates";

export class Planete implements IPlanete {
    width: number;
    height: number;

    obstacles: Obstacle[] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    generateObstacle(number: number) {
        for (let i = 0; i < number; i++) {
            let obstacle: Obstacle;

            // Génération de coordonnées aléatoires
            do {
                const randomX = Math.floor(Math.random() * this.width);
                const randomY = Math.floor(Math.random() * this.height);

                const coordonnees = new Coordinates(randomX, randomY);
                obstacle = new Obstacle(coordonnees);

                // Vérification que les coordonnées ne sont pas déjà utilisées
            } while (this.coordinatesAlreadyUsed(obstacle.getCoordonnees()));

            this.obstacles.push(obstacle);
        }
    }

    private coordinatesAlreadyUsed(coords: Coordinates): boolean {
        // Vérifier si les coordonnées sont déjà utilisées par un autre obstacle
        return this.obstacles.some(
            (obstacle) =>
                obstacle.getCoordonnees().x === coords.x ||
                obstacle.getCoordonnees().y === coords.y
        );
    }

    hasObstacleAtPosition(coordinates: Coordinates): boolean {
        return this.obstacles.some((obstacle) =>
            obstacle.getCoordonnees().isEqual(coordinates)
        );
    }

}
