import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Rover } from "./classes/Rover";
import { RoverInterpreteur } from "./interpreteurs/RoverInterpreteur";
import { Direction } from "./enums/Direction";
import { Position } from "./classes/Position";
import { Coordinates } from "./classes/Coordinates";
import { Planete } from "./classes/Planete";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const coordonneesRover = new Coordinates(0, 0);
const positionRover = new Position(coordonneesRover, Direction.Est);
const planete = new Planete(15, 15);
planete.generateObstacle(5);
const rover = new Rover(positionRover, planete);
const roverInterpreteur = new RoverInterpreteur(rover);

io.on("connection", (socket: Socket) => {
    console.log("Rover connecté !");
    console.log(planete.obstacles);

    socket.on("commande", (commandes: string) => {
        console.log("Commandes : " + commandes);

        const listeCommandes = commandes.split('');
        var commandIsValid = true;

        for (let i = 0; i < listeCommandes.length; i++) {
            switch (listeCommandes[i]) {
                case "z":
                    roverInterpreteur.executerCommande("avancer");
                    socket.emit('response', '\nLe rover a avancé et voici sa position : \n\n' +
                        'Coordonnées : { X : ' + rover.getCoordinates().x + ', Y : ' + rover.getCoordinates().y + ' }\n' +
                        'Direction : ' + rover.getDirection() + "\n\n");
                    break;
                case "s":
                    roverInterpreteur.executerCommande("reculer");
                    socket.emit('response', '\nLe rover a reculé et voici sa position : \n\n' +
                        'Coordonnées : { X : ' + rover.getCoordinates().x + ', Y : ' + rover.getCoordinates().y + ' }\n' +
                        'Direction : ' + rover.getDirection() + "\n\n");
                    break;
                case "q":
                    roverInterpreteur.executerCommande("gauche");
                    socket.emit('response', '\nLe rover a tourné à gauche et voici sa position : \n\n' +
                        'Coordonnées : { X : ' + rover.getCoordinates().x + ', Y : ' + rover.getCoordinates().y + ' }\n' +
                        'Direction : ' + rover.getDirection() + "\n\n");
                    break;
                case "d":
                    roverInterpreteur.executerCommande("droite");
                    socket.emit('response', '\nLe rover a tourné à droite et voici sa position : \n\n' +
                        'Coordonnées : { X : ' + rover.getCoordinates().x + ', Y : ' + rover.getCoordinates().y + ' }\n' +
                        'Direction : ' + rover.getDirection() + "\n\n");
                    break;
                default:
                    commandIsValid = false;
            }

            if (!commandIsValid) {
                socket.emit('response', "Commande invalide. \n[" + "\x1B[32m" + listeCommandes.slice(0, i).join(' ') + "\x1B[31m " + listeCommandes[i] + " \x1B[0m" + listeCommandes.slice(i+1, listeCommandes.length).join(' ') + "]");
                break;
            }
        }
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Le server du Rover écoute le port : ${PORT}`);
});
