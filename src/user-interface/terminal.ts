import van from "vanjs-core";
import io from "socket.io-client";

const { a, div, li, p, ul } = van.tags

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Le client MissionController est connecté!");
});

const Hello = (): HTMLDivElement => div(
    p("👋Hello"),
    ul(
        li("🗺️World"),
        li(a({ href: "https://vanjs.org/" }, "🍦VanJS")),
    ),
);


export default Hello;

