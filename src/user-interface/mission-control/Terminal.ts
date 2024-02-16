import { Socket } from "socket.io-client";
import van, { State } from "vanjs-core";
import { printOutput } from "../utils";

const { div, textarea, span, input } = van.tags;

const Terminal = (socket: Socket) => {
    const inputContent: State<string> = van.state("");

    const attendreReponse = async (): Promise<string> => {
        return new Promise((resolve) => {
            socket.once("response", resolve);
        });
    };

    const handleInput = async (e: KeyboardEvent) => {
        if (e.key === "Enter" && inputContent.val !== "") {
            socket.emit("commande", inputContent.val.toLowerCase());
            const reponse = await attendreReponse();
            const responseTrimmed = reponse.replace(/\n{2,}|\r/g, "").trim();
            printOutput([`${inputContent.val}`, responseTrimmed]);
            inputContent.val = "";
            return;
        }
    };

    const cursorInterval = () =>
        setInterval(() => {
            const cursor = document.getElementById("cursor");
            if (cursor?.style.getPropertyValue("visibility") === "visible") {
                cursor?.style.setProperty("visibility", "hidden");
            } else {
                cursor?.style.setProperty("visibility", "visible");
            }
        }, 500);

    const handleFocus = () => {
        const textarea = document.getElementById("textarea");
        const cmdInput = document.getElementById("cmd-input");
        document.activeElement !== cmdInput && cmdInput!.focus();
        if (textarea) {
            cursorInterval;
        }
    };

    const handleInputBlur = () => {
        const cursor = document.getElementById("cursor");
        clearInterval(cursorInterval());
        cursor?.style.setProperty("visibility", "visible");
    };

    return [
        div(
            { id: "std-out" },
            textarea({
                id: "textarea",
                readOnly: true,
                onclick: () => handleFocus(),
            })
        ),
        div(
            {
                id: "cmd",
                onkeyup: (e: KeyboardEvent) => handleInput(e),
                onclick: () => handleFocus(),
            },
            [
                span({ innerHTML: () => `> ${inputContent.val}` }),
                div({ id: "cursor" }),
                input({
                    id: "cmd-input",
                    type: "text",
                    name: "command",
                    onblur: () => handleInputBlur(),
                    oninput: (e) => (inputContent.val = e.target.value),
                    value: inputContent,
                }),
            ]
        ),
    ];
};

export default Terminal;
