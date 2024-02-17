import {Inputs} from "../enums/Inputs";
import {Rover} from "../classes/Rover";

export class Interpreter {

    constructor() {
    }

    interpretCommands(listeCommandes: string[], rover: Rover, messageResponse: string): string {

        for (let i = 0; i < listeCommandes.length; i++) {

            // Vérification de la validité des commandes
            if (!Object.values(Inputs).includes(listeCommandes[i] as Inputs)) {
                messageResponse = messageResponse +
                    "\nCommande invalide. [" +
                    "\x1B[32m" +
                    listeCommandes.slice(0, i).join(' ') +
                    "\x1B[31m " +
                    listeCommandes[i] +
                    " \x1B[0m" +
                    listeCommandes.slice(i + 1, listeCommandes.length).join(' ') +
                    "]"
                ;
                break;
            } else {
                // Avancer
                if (listeCommandes[i].toLowerCase() === Inputs.Avancer) {
                    if (!rover.checkObstacleForward()) {
                        rover.avancer();
                        messageResponse = messageResponse +
                            '\nCoordonnées : { X: ' + rover.getCoordinates().x + ', Y: ' + rover.getCoordinates().y + ' } ' +
                            'Direction : ' +
                            rover.getDirection()
                        ;
                    } else {
                        messageResponse = messageResponse +
                            '\nImpossible d\'avancer, obstacle en { X: ' +
                            rover.getNextPosition().x +
                            ', Y: ' +
                            rover.getNextPosition().y +
                            ' }'
                        ;
                        break;
                    }
                }
                // Reculer
                if (listeCommandes[i].toLowerCase() === Inputs.Reculer) {
                    if (!rover.checkObstacleBackward()) {
                        rover.reculer();
                        messageResponse = messageResponse +
                            '\nCoordonnées : { X: ' + rover.getCoordinates().x + ', Y: ' + rover.getCoordinates().y + ' } ' +
                            'Direction : ' +
                            rover.getDirection()
                        ;
                    } else {
                        messageResponse = messageResponse +
                            '\nImpossible de reculer, obstacle en { X: ' +
                            rover.getNextPosition().x +
                            ', Y: ' +
                            rover.getNextPosition().y +
                            ' }'
                        ;
                        break;
                    }
                }
                // Gauche
                if (listeCommandes[i].toLowerCase() === Inputs.Gauche) {
                    rover.tournerGauche();
                    messageResponse = messageResponse +
                        '\nCoordonnées : { X: ' + rover.getCoordinates().x + ', Y: ' + rover.getCoordinates().y + ' } ' +
                        'Direction : ' +
                        rover.getDirection()
                    ;
                }
                // Droite
                if (listeCommandes[i].toLowerCase() === Inputs.Droite) {
                    rover.tournerDroite();
                    messageResponse = messageResponse +
                        '\nCoordonnées : { X: ' + rover.getCoordinates().x + ', Y: ' + rover.getCoordinates().y + ' } ' +
                        'Direction : ' +
                        rover.getDirection()
                    ;
                }
            }
        }

        return messageResponse;
    }
}