// ICI mettre la gestion des obstacles présent de la classe Planète
import { Planete } from "../classes/Planete";
import { Coordinates } from "../classes/Coordinates";
import { ObstaclesService } from "./ObstaclesService";

export class PlaneteService {
    setObstacles(planete: Planete) {
        planete.obstacles = new ObstaclesService()
            .withPlanete(planete)
            .howManyObstacles(5)
            .build();
    }

    // Vérifie si un obstacle se trouve à la position donnée
    hasObstacleAtPosition(coordinates: Coordinates, planete: Planete): boolean {
        return planete.obstacles.some((obstacle) =>
            obstacle.getCoordonnees().isEqual(coordinates)
        );
    }
}
