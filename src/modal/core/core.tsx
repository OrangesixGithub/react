import { modalVariants } from "../variants";
import type { ModalProps } from "../@types";
import type { DialogProps } from "primereact/dialog";

/**
 * Core - `modalCore`
 * Define as propriedades base para funcionamento da Modal
 */
export function modalCore(
    props: ModalProps
): DialogProps {
    const styles = modalVariants();
    const title = <span className={styles.title()}>
        {props.icon !== undefined && <i
            aria-hidden="true"
            className={`${props.iconPrefix ?? "bi bi-"}${props.icon}`}/>}
        {props.header}
    </span>;

    return {
        appendTo: props.appendTo === undefined ? "self" : props.appendTo,
        visible: props.visible,
        onHide() {
            props.onVisible(false);
        },
        modal: props.background === undefined || props.background,
        dismissableMask: props.backdrop === undefined || !props.backdrop,

        maximizable: props.maximizable,
        draggable: props.draggable,
        closable: props.closable === undefined || props.closable,
        baseZIndex: props.zIndex ?? 1000,

        position: props.position,
        header: title,
        footer: props.footer,
        showHeader: !(props.header === false),
    };
}
