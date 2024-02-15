import { Socket } from "socket.io-client";
import van, { State } from "vanjs-core";

const { div, textarea, span, input } = van.tags;

const Terminal = (socket: Socket) => {
    const inputContent: State<string> = van.state("");

    const attendreReponse = async (): Promise<string> => {
        return new Promise((resolve) => {
            socket.once("response", resolve);
        });
    };

    const handleInput = async (e: KeyboardEvent) => {
        const textarea = document.getElementById("textarea");
        if (e.key === "Enter" && inputContent.val !== "") {
            socket.emit("commande", inputContent.val.toLowerCase());
            const reponse = await attendreReponse();
            textarea!.innerHTML += `\n> ${inputContent.val}${reponse
                .replace(/\n{2,}|\r/g, "")
                .trim()}`;
            inputContent.val = "";
            textarea!.scrollTop = textarea!.scrollHeight;
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
        console.log("focus");
        const textarea = document.getElementById("textarea");
        const cmdInput = document.getElementById("cmd-input");
        document.activeElement !== cmdInput && cmdInput!.focus();
        if (textarea) {
            cursorInterval;
        }
    };

    const handleInputBlur = () => {
        console.log("blur");
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
