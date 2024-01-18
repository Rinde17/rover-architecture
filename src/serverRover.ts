// import * as http from 'http';
// import express from 'express';
// import {Server as SocketIOServer} from 'socket.io';
// import {Rover} from './classes/Rover';
// import {Position} from "./classes/Position";
// import {Coordonates} from "./classes/Coordonates";
// import {Direction} from "./enums/Direction";
// import {Planete} from "./classes/Planete";
// import {RoverInterpreteur} from "./interpreteurs/RoverInterpreteur";
// import {MissionControllerSocketIO} from "./classes/MissionControllerSocketIO";
//
// const app = express();
// const server = http.createServer(app);
// const io = new SocketIOServer(server);
//
// const position = new Position(new Coordonates(0,0), Direction.Nord);
// const planete = new Planete(10,10);
// export const rover = new Rover(position, planete);
//
// io.on('connection', (socket) => {
//     console.log('Le MissionController s\'est connecté');
//
//     // Écoute des commandes envoyées par le MissionController
//     socket.on('commande', (commande: string) => {
//         console.log(`Commande reçue : ${commande}`);
//         // Logique pour interpréter et exécuter la commande sur le Rover
//     });
//
//     // Écoute des mises à jour du Rover (coordonnées, état, etc.)
//     // Émettre des événements lorsque des mises à jour surviennent sur le Rover
// });
//
// server.listen(3000, () => {
//     console.log('Serveur Socket.IO du Rover écoutant sur le port 3000');
// });

import express from 'express';
import { createServer } from 'http';
import {Server, Socket} from "socket.io";
import {Rover} from "./classes/Rover";
import {RoverInterpreteur} from "./interpreteurs/RoverInterpreteur";
import {MissionController} from "./classes/MissionController";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket: Socket) => {
    console.log('Rover connecté !');

    socket.on('commande', (commande: string, rover: Rover) => {

        const roverInterpreteur = new RoverInterpreteur(rover);
        const missionController = new MissionController(roverInterpreteur);

        console.log("Commande : " + commande);

        switch (commande) {
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
                return; // Sortir de la boucle while
            default:
                console.log('Commande invalide. Veuillez réessayer.');
        }

        // Afficher l'état actuel du Rover
        console.log(`Position actuelle : ${rover.getCoordonnees().x}, ${rover.getCoordonnees().y}`);
        console.log(`Direction actuelle : ${rover.getDirection()}`);

    })
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Le server du Rover écoute le port : ${PORT}`);
})