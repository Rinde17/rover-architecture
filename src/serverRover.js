"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const RoverInterpreteur_1 = require("./interpreteurs/RoverInterpreteur");
const MissionController_1 = require("./classes/MissionController");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
io.on('connection', (socket) => {
    console.log('Rover connecté !');
    socket.on('commande', (commande, rover) => {
        const roverInterpreteur = new RoverInterpreteur_1.RoverInterpreteur(rover);
        const missionController = new MissionController_1.MissionController(roverInterpreteur);
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
    });
});
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Le server du Rover écoute le port : ${PORT}`);
});
