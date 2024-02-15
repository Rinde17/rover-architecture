import van from "vanjs-core";
import io from "socket.io-client";

import Terminal from "./mission-control/Terminal";
import AsidePanel from "./mission-control/AsidePanel";

const { div } = van.tags;

const socket = io("http://localhost:3000", { autoConnect: false });

function App() {
    return div(
        { id: "mission-control" },
        div({ id: "terminal" }, Terminal(socket)),
        div({ id: "aside-panel" }, AsidePanel(socket))
    );
}
van.add(document.getElementById("app")!, App());
