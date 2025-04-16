import React from "react";
import { ModalMessage } from "./core/modal";
import { MessageModeProps, MessageProps } from "./types";

/**
 * Componente - `Message`
 *
 * Um componente versátil que é utilizado emitir messagens no sistema.
 */
export function Message<T extends MessageModeProps = "modal">(props: MessageProps<T> & { type?: T }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            {!props.type || props.type === "modal"
                ? <ModalMessage {...props}/>
                : null}
        </>
    );
}