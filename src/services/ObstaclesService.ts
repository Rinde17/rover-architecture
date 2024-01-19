import { Planete } from "../classes/Planete";
import { Coordinates } from "../classes/Coordinates";
import { Obstacle } from "../classes/Obstacle";

export class ObstaclesService {
    planete: Planete = new Planete(10, 10);
    number: number = 0;
    obstacles: Obstacle[] = [];

    withPlanete(planete: Planete): this {
        this.planete = planete;
        return this;
    }

    howManyObstacles(number: number): this {
        this.number = number;
        return this;
    }

    private generateObstacle() {
        for (let i = 0; i < this.number; i++) {
            let obstacle: Obstacle;

            // Génération de coordonnées aléatoires
            do {
                const randomX = Math.floor(Math.random() * this.planete.width);
                const randomY = Math.floor(Math.random() * this.planete.height);

                const coordonnees = new Coordinates(randomX, randomY);
                obstacle = new Obstacle(coordonnees);

                // Vérification que les coordonnées ne sont pas déjà utilisées
            } while (this.coordinatesAlreadyUsed(obstacle.getCoordonnees()));

            this.addObstacle(obstacle);
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

    private addObstacle(obstacle: Obstacle) {
        this.obstacles?.push(obstacle);
    }

    build(): Obstacle[] {
        this.generateObstacle();
        return this.obstacles;
    }
}
