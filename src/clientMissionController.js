"use strict";
// import io from 'socket.io-client';
// import {MissionControllerSocketIO} from "./classes/MissionControllerSocketIO";
// import {RoverInterpreteur} from "./interpreteurs/RoverInterpreteur";
// import { rover } from "./serverRover";
//
// const socketClient = io();
//
// const roverInterpreteur = new RoverInterpreteur(rover);
// const missionController = new MissionControllerSocketIO(roverInterpreteur, socketClient);
//
// missionController.envoyerCommandeAuRover("avancer");
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const Planete_1 = require("./classes/Planete");
const Coordonates_1 = require("./classes/Coordonates");
const Position_1 = require("./classes/Position");
const Direction_1 = require("./enums/Direction");
const Rover_1 = require("./classes/Rover");
const socket = (0, socket_io_client_1.io)('http://localhost:3000');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const planete = new Planete_1.Planete(10, 10);
const coordonneesRover = new Coordonates_1.Coordonates(0, 0);
const positionRover = new Position_1.Position(coordonneesRover, Direction_1.Direction.Est);
const rover = new Rover_1.Rover(positionRover, planete);
// Fonction pour demander une commande et exécuter le Rover
function demanderCommande() {
    rl.question('Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter) : ', (commande) => {
        // Convertir la commande en minuscules pour éviter les erreurs de casse
        const commandeMinuscule = commande.toLowerCase();
        socket.emit('commande', commandeMinuscule, rover, (response) => {
            console.log(response);
        });
        // Demander la prochaine commande
        demanderCommande();
    });
}
socket.on('connect', () => {
    console.log('Le client MissionController est connecté !');
    // Démarrer la boucle en demandant la première commande
    demanderCommande();
});
