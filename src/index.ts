import { Rover } from "./classes/Rover";
import { RoverInterpreteur } from "./interpreteurs/RoverInterpreteur";
import { MissionController } from "./classes/MissionController";
import { Direction } from "./enums/Direction";
import { Planete } from "./classes/Planete";
import { Coordinates } from "./classes/Coordinates";
import { Position } from "./classes/Position";
import readline from "readline";
import { ObstaclesBuilder } from "./builder/ObstaclesBuilder";

const planete = new Planete(10, 10);
const obstacles = new ObstaclesBuilder()
    .withPlanete(planete)
    .howManyObstacles(5)
    .build();

planete.addObstacles(obstacles);
console.log(planete.obstacles);

const coordonneesRover = new Coordinates(0, 0);
const positionRover = new Position(coordonneesRover, Direction.Est);
const rover = new Rover(positionRover, planete);
const roverInterpreteur = new RoverInterpreteur(rover);
const missionController = new MissionController(roverInterpreteur);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Fonction pour demander une commande et exécuter le Rover
function demanderCommande() {
    rl.question(
        "Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter) : ",
        (commande: string) => {
            // Convertir la commande en minuscules pour éviter les erreurs de casse
            const commandeMinuscule = commande.toLowerCase();

            switch (commandeMinuscule) {
                case "z":
                    missionController.envoyerCommandeAuRover("avancer");
                    break;
                case "s":
                    missionController.envoyerCommandeAuRover("reculer");
                    break;
                case "q":
                    missionController.envoyerCommandeAuRover("gauche");
                    break;
                case "d":
                    missionController.envoyerCommandeAuRover("droite");
                    break;
                case "9":
                    console.log("Le programme est terminé.");
                    rl.close();
                    return; // Sortir de la boucle while
                default:
                    console.log("Commande invalide. Veuillez réessayer.");
            }

            // Afficher l'état actuel du Rover
            console.log(
                `Position actuelle : ${rover.getCoordinates().x}, ${
                    rover.getCoordinates().y
                }`
            );
            console.log(`Direction actuelle : ${rover.getDirection()}`);

            // Demander la prochaine commande
            demanderCommande();
        }
    );
}

// Démarrer la boucle en demandant la première commande
demanderCommande();

// import {ObstaclesBuilder} from "./builder/ObstaclesBuilder";
// import {Planete} from "./classes/Planete";
//
// const planete = new Planete(10,10);
// const obstacles = new ObstaclesBuilder().withPlanete(planete).howManyObstacles(5).build();
// planete.addObstacles(obstacles);
//
// console.log(planete.obstacles)
