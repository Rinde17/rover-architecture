import { Rover } from "./classes/Rover";
import { RoverInterpreteur } from "./interpreteurs/RoverInterpreteur";
import { MissionController} from "./classes/MissionController";
import { Direction } from "./enums/Direction";
import {Planete} from "./classes/Planete";
import {Coordonates} from "./classes/Coordonates";
import {Position} from "./classes/Position";

const planete = new Planete(10, 10);
const coordonneesRover = new Coordonates(0,0);
const positionRover = new Position(coordonneesRover, Direction.Est);
const rover = new Rover(positionRover, planete);
const roverInterpreteur = new RoverInterpreteur(rover);
const missionController = new MissionController(roverInterpreteur);

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour demander une commande et exécuter le Rover
function demanderCommande() {
    rl.question('Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter) : ', (commande: string) => {
        // Convertir la commande en minuscules pour éviter les erreurs de casse
        const commandeMinuscule = commande.toLowerCase();

        switch (commandeMinuscule) {
            case 'z':
                missionController.envoyerCommandeAuRover("avancer");
                break;
            case 's':
                missionController.envoyerCommandeAuRover("reculer");
                break;
            case 'q':
                missionController.envoyerCommandeAuRover("gauche");
                break;
            case 'd':
                missionController.envoyerCommandeAuRover("droite");
                break;
            case '9':
                console.log('Le programme est terminé.');
                rl.close();
                return; // Sortir de la boucle while
            default:
                console.log('Commande invalide. Veuillez réessayer.');
        }

        // Afficher l'état actuel du Rover
        console.log(`Position actuelle : ${rover.getCoordonnees().x}, ${rover.getCoordonnees().y}`);
        console.log(`Direction actuelle : ${rover.getDirection()}`);

        // Demander la prochaine commande
        demanderCommande();
    });
}

// Démarrer la boucle en demandant la première commande
demanderCommande();
