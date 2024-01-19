// ICI mettre la gestion des obstacles présent de la classe Planète
import { Planete } from "../classes/Planete";
import { Coordinates } from "../classes/Coordinates";
import { ObstaclesService } from "./ObstaclesService";

export class PlanetService {
    planete = new Planete(10, 10);
    obstacles = new ObstaclesService()
        .withPlanete(this.planete)
        .howManyObstacles(5)
        .build();

    build(): Planete {
        this.setObstacles();
        return this.planete;
    }

    setObstacles() {
        this.planete.obstacles = this.obstacles;
    }

    // Vérifie si un obstacle se trouve à la position donnée
    hasObstacleAtPosition(coordinates: Coordinates): boolean {
        return this.obstacles.some((obstacle) =>
            obstacle.getCoordonnees().isEqual(coordinates)
        );
    }
}
