import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Rover } from "./classes/Rover";
import { RoverInterpreteur } from "./interpreteurs/RoverInterpreteur";
import { MissionController } from "./classes/MissionController";
import { Planete } from "./classes/Planete";
import { Direction } from "./enums/Direction";
import { Position } from "./classes/Position";
import { Coordonates } from "./classes/Coordonates";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const planete = new Planete(10, 10);
const coordonneesRover = new Coordonates(0, 0);
const positionRover = new Position(coordonneesRover, Direction.Est);
const rover = new Rover(positionRover, planete);
const roverInterpreteur = new RoverInterpreteur(rover);

io.on("connection", (socket: Socket) => {
    console.log("Rover connecté !");

    socket.on("commande", (commande: string) => {
        console.log("Commande : " + commande);

        switch (commande) {
            case "z":
                roverInterpreteur.executerCommande("avancer");
                break;
            case "s":
                roverInterpreteur.executerCommande("reculer");
                break;
            case "q":
                roverInterpreteur.executerCommande("gauche");
                break;
            case "d":
                roverInterpreteur.executerCommande("droite");
                break;
            case "9":
                console.log("Le programme est terminé.");
                return; // Sortir de la boucle while
            default:
                console.log("Commande invalide. Veuillez réessayer.");
        }

        // Afficher l'état actuel du Rover
        console.log(
            `Position actuelle : ${rover.getCoordonnees().x}, ${
                rover.getCoordonnees().y
            }`
        );
        console.log(`Direction actuelle : ${rover.getDirection()}`);
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Le server du Rover écoute le port : ${PORT}`);
});
