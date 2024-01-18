import { RoverInterpreteur } from "../interpreteurs/RoverInterpreteur";
import { Socket } from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export class MissionControllerSocketIO implements IMissionController {
    private roverInterpreteur: RoverInterpreteur;
    private socket: Socket;

    constructor(roverInterpreteur: RoverInterpreteur, socket: any) {
        this.roverInterpreteur = roverInterpreteur;
        this.socket = socket;

        this.socket.on('connect', () => {
            console.log('Connecté au Rover');
        });
    }

    envoyerCommandeAuRover(commande: String) {
        // Émettre la commande vers le serveur du Rover via Socket.IO
        this.socket.emit('commande', commande);
        // this.roverInterpreteur.executerCommande(commande);
    }
}