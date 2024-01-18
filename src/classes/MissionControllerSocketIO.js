"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionControllerSocketIO = void 0;
class MissionControllerSocketIO {
    constructor(roverInterpreteur, socket) {
        this.roverInterpreteur = roverInterpreteur;
        this.socket = socket;
        this.socket.on('connect', () => {
            console.log('Connecté au Rover');
        });
    }
    envoyerCommandeAuRover(commande) {
        // Émettre la commande vers le serveur du Rover via Socket.IO
        this.socket.emit('commande', commande);
        // this.roverInterpreteur.executerCommande(commande);
    }
}
exports.MissionControllerSocketIO = MissionControllerSocketIO;
