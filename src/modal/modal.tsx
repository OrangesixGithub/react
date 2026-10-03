import { useState } from "react";
import { modalCore } from "./core/core";
import type { ModalProps } from "./@types";
import { modalVariants } from "./variants";
import { Dialog } from "primereact/dialog";
import { useModalDrag } from "./hooks/useModalDrag";
import { useModalTransiction } from "./hooks/useModalTransiction";

/**
 * Componente - `Modal`
 *
 * Um componente versátil que é utilizado exibir dados em forma de janela suspensa.
 */
export function Modal(props: ModalProps) {
    const [maximized, setMaximized] = useState(props.maximized ?? false);
    
    const draggable = (props.draggable ?? false) && !maximized;
    const drag = useModalDrag({ visible: props.visible, enabled: draggable });
    const transitionOptions = useModalTransiction(props.transition);
    const styles = modalVariants({
        sizes: props.sizes,
        maximized,
        draggable,
        background: props.background ?? true,
        header: props.header !== false,
    });

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Dialog
            {...modalCore(props)}
            unstyled
            closeIcon={<i
                aria-hidden="true"
                className="bi bi-x-lg"/>}
            maximizeIcon={<i
                aria-hidden="true"
                className="bi bi-arrows-fullscreen"/>}
            minimizeIcon={<i
                aria-hidden="true"
                className="bi bi-fullscreen-exit"/>}
            pt={{
                mask: { className: styles.mask() },
                header: { className: styles.header(), onPointerDown: drag.onPointerDown },
                headerTitle: { className: "min-w-0 flex-1" },
                headerIcons: { className: styles.icons() },
                closeButton: { className: styles.close() },
                maximizableButton: { className: styles.close() },
                content: { className: styles.content() },
                footer: { className: styles.footer() },
            }}
            className={styles.root({ className: props.className })}
            draggable={false}
            maximized={maximized}
            resizable={false}
            transitionOptions={transitionOptions}
            onMaximize={(event) => setMaximized(event.maximized)}>
            {props.children}
        </Dialog>
    );
}

Modal.displayName = "Modal";
