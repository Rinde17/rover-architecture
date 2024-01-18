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

import { io } from 'socket.io-client';
import {Planete} from "./classes/Planete";
import {Coordonates} from "./classes/Coordonates";
import {Position} from "./classes/Position";
import {Direction} from "./enums/Direction";
import {Rover} from "./classes/Rover";
import {RoverInterpreteur} from "./interpreteurs/RoverInterpreteur";
import {MissionController} from "./classes/MissionController";
import {response} from "express";

const socket = io('http://localhost:3000');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const planete = new Planete(10, 10);
const coordonneesRover = new Coordonates(0,0);
const positionRover = new Position(coordonneesRover, Direction.Est);
const rover = new Rover(positionRover, planete);

// Fonction pour demander une commande et exécuter le Rover
function demanderCommande() {
    rl.question('Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter) : ', (commande: string) => {
        // Convertir la commande en minuscules pour éviter les erreurs de casse
        const commandeMinuscule = commande.toLowerCase();

        socket.emit('commande', commandeMinuscule, rover, (response: any) => {
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