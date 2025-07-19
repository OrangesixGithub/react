import React from "react";
import { ModalProps } from "..";
import { DialogProps } from "primereact/dialog";

/**
 * `Core`
 * Define as propriedades base para funcionamento da Modal
 */
export function modalCore(
    props: ModalProps
): DialogProps {
    const title = props.icon !== undefined
        ? <h5 className="fw-semibold">
            <i className={"me-1 " + (props.iconPrefix ?? "bi bi-") + props.icon}/>{props.header}</h5>
        : props.header;

    return {
        appendTo: "self",
        visible: props.visible,
        onHide() {
            props.onVisible(!props.visible);
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