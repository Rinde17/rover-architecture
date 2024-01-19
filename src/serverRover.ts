import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Rover } from "./classes/Rover";
import { RoverInterpreteur } from "./interpreteurs/RoverInterpreteur";
import { Direction } from "./enums/Direction";
import { Position } from "./classes/Position";
import { Coordinates } from "./classes/Coordinates";
import { Planete } from "./classes/Planete";
import {Inputs} from "./enums/Inputs";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const coordonneesRover = new Coordinates(0, 0);
const positionRover = new Position(coordonneesRover, Direction.Est);
const planete = new Planete(15, 15);
planete.generateObstacle(5);
const rover = new Rover(positionRover, planete);

io.on("connection", (socket: Socket) => {
    console.log("Rover connecté !");
    console.log(planete.obstacles);

    socket.on("commande", (commandes: string) => {
        console.log("Commandes : " + commandes);

        const listeCommandes = commandes.split('');
        let messageResponse = '\nCoordonnées initiales : { X: ' + rover.getCoordinates().x + ', Y: ' + rover.getCoordinates().y + ' } ' + 'Direction : ' + rover.getDirection();

        for (let i = 0; i < listeCommandes.length; i++) {
            switch (listeCommandes[i].toLowerCase()) {
                case Inputs.Avancer:
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
                    }
                    break;
                case Inputs.Reculer:
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
                    }
                    break;
                case Inputs.Gauche:
                    rover.tournerGauche();
                    messageResponse = messageResponse +
                        '\nCoordonnées : { X: ' + rover.getCoordinates().x + ', Y: ' + rover.getCoordinates().y + ' } ' +
                        'Direction : ' +
                        rover.getDirection()
                    ;
                    break;
                case Inputs.Droite:
                    rover.tournerDroite();
                    messageResponse = messageResponse +
                        '\nCoordonnées : { X: ' + rover.getCoordinates().x + ', Y: ' + rover.getCoordinates().y + ' } ' +
                        'Direction : ' +
                        rover.getDirection()
                    ;
                    break;
                default:
                    messageResponse = messageResponse +
                        "\nCommande invalide. [" +
                        "\x1B[32m" +
                        listeCommandes.slice(0, i).join(' ') +
                        "\x1B[31m " +
                        listeCommandes[i] +
                        " \x1B[0m" +
                        listeCommandes.slice(i+1, listeCommandes.length).join(' ') +
                        "]"
                    ;
                    break;
            }
        }
        socket.emit('response', messageResponse);
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Le server du Rover écoute le port : ${PORT}`);
});
