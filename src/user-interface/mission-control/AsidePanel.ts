import { Socket } from "socket.io-client";
import van, { State } from "vanjs-core";
import { printOutput } from "../utils";

const { div, button, img, span } = van.tags;

const connexionIconColor: State<string> = van.state("red");

const ConnexionIndicator = () => {
    return span(
        {
            id: "connexion-indicator",
            style: () =>
                `color: ${van.val(
                    connexionIconColor
                )};font-size: 56px; position: absolute; top: -50%; right: -30%;`,
        },
        "•"
    );
};

const AsidePanel = (socket: Socket) => {
    const isSocketConnected: State<boolean> = van.state(socket.connected);

    const changeConnexionIconColor = () => {
        if (socket.connected) {
            isSocketConnected.val = true;
            connexionIconColor.val = "green";
        } else {
            isSocketConnected.val = false;
            connexionIconColor.val = "red";
        }
    };

    socket.on("connect-error", (error) => {
        console.log(error);
        printOutput(["Erreur de connexion : " + error]);
    });

    socket.io.once("error", () => {
        printOutput(["Erreur de connexion : le serveur est injoignable !"]);
    });

    socket.io.once("reconnect_failed", () => {
        printOutput(["Toutes les tentatives de reconnexion ont échoué !"]);
    });

    socket.io.once("reconnect", (reconnexionAttemptCount) => {
        printOutput([
            `Reconnexion réussie après ${reconnexionAttemptCount} tentatives !`,
        ]);
    });

    socket.io.on("reconnect_attempt", (reconnexionAttemptCount) => {
        printOutput([
            `Tentative n°${reconnexionAttemptCount} de reconnexion ...`,
        ]);
    });

    socket.on("connect", () => {
        changeConnexionIconColor();
        printOutput([
            "La connexion au Rover est établie !",
            "Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter)",
        ]);
    });

    const socketOnOff = () => {
        if (socket.connected) {
            printOutput(["Déconnexion en cours ..."]);
            setTimeout(() => {
                socket.close();
            }, 1500);
        } else {
            printOutput(["Connexion en cours ..."]);
            setTimeout(() => {
                socket.open();
            }, 1500);
        }
    };

    socket.on("disconnect", (message) => {
        changeConnexionIconColor();
        printOutput([
            "La connexion avec le Rover à été interrompue !",
            message,
        ]);
    });

    return [
        div({ id: "signals" }, [
            img({
                id: "network-health-icon",
                width: "56",
                height: "56",
                src: () =>
                    isSocketConnected.val
                        ? "./src/assets/img/network-cellular-signal-excellent.svg"
                        : "./src/assets/img/network-cellular-offline.svg",
            }),
            img({
                width: "56",
                height: "56",
                src: "./src/assets/img/warning-filled.svg",
            }),
        ]),
        div({ style: "position: relative;" }, [
            button(
                { id: "disconnected-btn", onclick: () => socketOnOff() },
                img({
                    id: "disconnected-icon",
                    width: "56",
                    height: "56",
                    src: "./src/assets/img/off-svgrepo-com.svg",
                })
            ),
            ConnexionIndicator(),
        ]),
    ];
};

export default AsidePanel;
