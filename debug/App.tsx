import React from "react";
import Root from "./src";
import ReactDOM from "react-dom/client";

//Libs
import "./assets/css/theme.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@webdatarocks/webdatarocks/webdatarocks.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Root/>,
);
