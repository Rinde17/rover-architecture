import { Socket } from "socket.io-client";
import van from "vanjs-core";

const { div, button, img, span } = van.tags;

const ConnexionIndicator = () => {
    return span(
        {
            id: "connexion-indicator",
            style: "font-size: 56px; margin: 0;",
        },
        "•"
    );
};

const AsidePanel = (socket: Socket) => {
    const changeConnexionIconColor = () => {
        const connexionIndicator = document.getElementById(
            "connexion-indicator"
        );
        if (socket.connected === true) {
            connexionIndicator!.style.color = "green";
        } else {
            connexionIndicator!.style.color = "red";
        }
    };

    socket.on("connect", () => {
        const stdoutElement = document.getElementById("std-out");
        changeConnexionIconColor();
        stdoutElement!.innerText += "\n> La connexion au Rover est établie !";
        stdoutElement!.innerText +=
            "\n> Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter)";
    });

    const socketOnOff = () => {
        const stdoutElement = document.getElementById("std-out");
        if (socket.connected) {
            stdoutElement!.innerText += "\n> Déconnexion en cours ...";
            setTimeout(() => {
                socket.close();
                changeConnexionIconColor();
            }, 1500);
            changeConnexionIconColor();
        } else {
            stdoutElement!.innerHTML += "\n> Connexion en cours ...";
            setTimeout(() => {
                socket.open();
                changeConnexionIconColor();
            }, 1500);
        }
    };

    socket.on("disconnect", (message) => {
        const stdoutElement = document.getElementById("std-out");
        stdoutElement!.innerText +=
            "\n> La connexion avec le Rover à été interrompue !";
        stdoutElement!.innerText += `\n> ${message}`;
    });

    return [
        div({ id: "signals" }, [
            img({
                id: "network-health-icon",
                width: "56",
                height: "56",
                src: "./src/assets/img/network-cellular-signal-excellent.svg",
            }),
            img({
                width: "56",
                height: "56",
                src: "./src/assets/img/warning-filled.svg",
            }),
        ]),
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
    ];
};

export default AsidePanel;
