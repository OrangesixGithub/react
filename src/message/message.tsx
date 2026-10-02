import { ModalMessage } from "./core/modal";
import type { MessageModeProps, MessageProps } from "./@types";

/**
 * Componente - `Message`
 *
 * Um componente versátil que é utilizado para emitir mensagens no sistema.
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

Message.displayName = "Message";
