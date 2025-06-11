import React, { useState } from "react";
import { ModalProps } from "./types";
import { modalCore } from "./core/core";
import { Dialog } from "primereact/dialog";

/**
 * Componente - `Modal`
 *
 * Um componente versátil que é utilizado exibir dados em forma de janela suspensa.
 */
export function Modal(props: ModalProps) {
    let sizes = !props.sizes ? undefined
        : props.sizes === "small" ? "300px"
            : props.sizes === "medium" ? "500px"
                : props.sizes === "large" ? "800px" : "80%";
    const [maximized, setMaximized] = useState(props.maximized ?? false);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Dialog style={!maximized ? { width: sizes } : {}}
                {...modalCore(props)}
                breakpoints={{
                    "768px": "80%",
                    "576px": "90%",
                }}
                className={props.className}
                maximized={maximized}
                onMaximize={() => setMaximized(!maximized)}>
            {props.children}
        </Dialog>
    );
}

Modal.displayName = "Modal";