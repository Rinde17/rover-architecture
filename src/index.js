"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rover_1 = require("./classes/Rover");
const RoverInterpreteur_1 = require("./interpreteurs/RoverInterpreteur");
const MissionController_1 = require("./classes/MissionController");
const Direction_1 = require("./enums/Direction");
const Planete_1 = require("./classes/Planete");
const Coordonates_1 = require("./classes/Coordonates");
const Position_1 = require("./classes/Position");
const planete = new Planete_1.Planete(10, 10);
const coordonneesRover = new Coordonates_1.Coordonates(0, 0);
const positionRover = new Position_1.Position(coordonneesRover, Direction_1.Direction.Est);
const rover = new Rover_1.Rover(positionRover, planete);
const roverInterpreteur = new RoverInterpreteur_1.RoverInterpreteur(rover);
const missionController = new MissionController_1.MissionController(roverInterpreteur);
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Fonction pour demander une commande et exécuter le Rover
function demanderCommande() {
    rl.question('Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter) : ', (commande) => {
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
