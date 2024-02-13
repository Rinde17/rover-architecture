import van from "vanjs-core";
import Terminal from "./terminal";
import { ConnexionIndicator } from "./terminal";

van.add(document.getElementById("aside-panel")!, Terminal());
van.add(document.getElementById("aside-panel")!, ConnexionIndicator());
