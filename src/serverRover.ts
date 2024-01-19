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

    socket.on("commande", (commande: string) => {
        console.log("Commande : " + commande);

        switch (commande) {
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
            case "9":
                console.log("Déconnexion ...");

                socket.emit('response', '\nLa dernière position du rover avant sa déconnexion : \n\n' +
                    'Coordonnées : { X : ' + rover.getCoordinates().x + ', Y : ' + rover.getCoordinates().y + ' }\n' +
                    'Direction : ' + rover.getDirection() + "\n\n");

                setTimeout(() => {
                    console.log("Le Rover est déconnecté.");
                }, 2000);

                io.close();
                return;
            default:
                socket.emit('response', "Commande invalide. Veuillez réessayer.");
        }
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Le server du Rover écoute le port : ${PORT}`);
});
