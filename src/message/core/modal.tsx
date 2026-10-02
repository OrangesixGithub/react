import { Button } from "../../button";
import { Dialog } from "primereact/dialog";
import { messageVariants } from "../variants";
import type { MessageProps } from "../@types";
import { useDialogDrag } from "../../api/hooks/useDialogDrag";

/**
 * Core - `ModalMessage`
 *
 * Exibe a confirmação modal com foco gerenciado pelo PrimeReact.
 */
export function ModalMessage({ confirm = true, cancel = true, ...props }: MessageProps<"modal">) {
    const styles = messageVariants({ position: props.modalOptionsPosition ?? "end" });
    const drag = useDialogDrag({
        visible: props.visible,
        enabled: props.draggable ?? true
    });

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Dialog
            modal
            unstyled
            closeIcon={<i
                aria-hidden="true"
                className="bi bi-x-lg"/>}
            header={<span className={styles.title()}>
                <i
                    aria-hidden="true"
                    className={`${props.modalIconPrefix ?? "bi bi-"}${props.modalIcon ?? "cone-striped"}`}/>
                {props.title ?? "Confirmação"}
            </span>}
            pt={{
                mask: { className: styles.mask() },
                header: {
                    className: styles.header({ className: props.draggable === false ? undefined : "cursor-move touch-none" }),
                    onPointerDown: drag.onPointerDown,
                },
                headerTitle: { className: "min-w-0" },
                closeButton: { className: styles.close() },
                content: { className: styles.content() },
            }}
            transitionOptions={{
                classNames: "os-modal",
                timeout: { enter: 300, exit: 150 }
            }}
            appendTo={props.appendTo === undefined ? "self" : props.appendTo}
            baseZIndex={props.modalZIndex ?? 1000}
            className={styles.root()}
            closable={props.modalClosable ?? true}
            dismissableMask={false}
            draggable={false}
            visible={props.visible}
            onHide={() => props.onVisible(false)}>
            <div
                className={styles.body()}
                dangerouslySetInnerHTML={{ __html: props.message ?? "" }}/>
            {(confirm || cancel) && <div className={styles.actions()}>
                {confirm && <Button
                    className={styles.confirm()}
                    color="primary"
                    isLoading={props.isLoading ?? false}
                    label={props.confirmLabel ?? "Confirmar"}
                    onClick={() => props.onConfirm?.()}/>}
                {cancel && <Button
                    className={styles.cancel()}
                    color="secondary"
                    label={props.cancelarLabel ?? "Cancelar"}
                    onClick={() => {
                        if (props.onCancel) {
                            props.onCancel();
                        } else {
                            props.onVisible(false);
                        }
                    }}/>}
            </div>}
        </Dialog>
    );
}

ModalMessage.displayName = "ModalMessage";
