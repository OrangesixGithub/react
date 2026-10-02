import type { ModalProps } from ".";
import { modalCore } from "./core/core";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useDialogDrag } from "../api/hooks/useDialogDrag";

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
    const draggable = (props.draggable ?? true) && !maximized;
    const drag = useDialogDrag({ visible: props.visible, enabled: draggable });

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Dialog
            {...modalCore(props)}
            breakpoints={{
                "768px": "80%",
                "576px": "90%",
            }}
            pt={{ header: {
                className: draggable ? "cursor-move touch-none" : undefined,
                onPointerDown: drag.onPointerDown,
            } }}
            className={props.className}
            draggable={false}
            maximized={maximized}
            style={!maximized ? { width: sizes } : {}}
            onMaximize={() => setMaximized(!maximized)}>
            {props.children}
        </Dialog>
    );
}

Modal.displayName = "Modal";
