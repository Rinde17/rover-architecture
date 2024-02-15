import { Socket } from "socket.io-client";
import van, { State } from "vanjs-core";

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
            connexionIconColor.val = "green";
        } else {
            connexionIconColor.val = "red";
        }
    };

    socket.on("connect", () => {
        const stdoutElement = document.getElementById("textarea");
        changeConnexionIconColor();
        stdoutElement!.innerHTML += "\n> La connexion au Rover est établie !";
        stdoutElement!.innerHTML +=
            "\n> Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter)";
        stdoutElement!.scrollTop = stdoutElement!.scrollHeight;
    });

    const socketOnOff = () => {
        const stdoutElement = document.getElementById("textarea");
        if (socket.connected) {
            stdoutElement!.innerHTML += "\n> Déconnexion en cours ...";
            setTimeout(() => {
                socket.close();
                isSocketConnected.val = false;
                changeConnexionIconColor();
            }, 1500);
        } else {
            stdoutElement!.innerHTML += "\n> Connexion en cours ...";
            setTimeout(() => {
                socket.open();
                isSocketConnected.val = true;
                changeConnexionIconColor();
            }, 1500);
        }
    };

    socket.on("disconnect", (message) => {
        const stdoutElement = document.getElementById("textarea");
        stdoutElement!.innerHTML +=
            "\n> La connexion avec le Rover à été interrompue !";
        stdoutElement!.innerHTML += `\n> ${message}`;
        stdoutElement!.scrollTop = stdoutElement!.scrollHeight;
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
