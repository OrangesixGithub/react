import { useRef, useState } from "react";
import { Button } from "../../button";
import { Dialog } from "primereact/dialog";
import { messageVariants } from "../variants";
import type { MessageProps } from "../@types";
import { useModalDrag } from "../../modal/hooks/useModalDrag";
import { useModalTransiction } from "../../modal/hooks/useModalTransiction";

/** Props de conteúdo mantidas estáveis durante a animação de fechamento. */
const contentKeys = [
    "title",
    "message",
    "variant",
    "modalIcon",
    "modalIconPrefix",
    "confirmLabel",
    "confirmIcon",
    "cancelarLabel",
    "cancelIcon",
] as const;

type MessageContent = Pick<MessageProps<"modal">, typeof contentKeys[number]>;

/**
 * Core - `ModalMessage`
 *
 * Exibe a confirmação modal com foco gerenciado pelo PrimeReact.
 */
export function ModalMessage({ confirm = true, cancel = true, ...props }: MessageProps<"modal">) {
    const content = Object.fromEntries(contentKeys.map(key => [key, props[key]])) as MessageContent;
    const [lastContent, setLastContent] = useState(content);
    if (props.visible && contentKeys.some(key => lastContent[key] !== content[key])) {
        setLastContent(content);
    }
    const view = props.visible ? content : lastContent;

    const confirmRef = useRef<HTMLButtonElement>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const closable = props.modalClosable ?? true;
    const styles = messageVariants({
        position: props.modalOptionsPosition ?? "end",
        variant: view.variant ?? "confirmation",
    });
    const transitionOptions = useModalTransiction(props.transition);
    const drag = useModalDrag({
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
            closable
            modal
            unstyled
            closeIcon={<i
                aria-hidden="true"
                className="bi bi-x-lg"/>}
            header={<span className={styles.title()}>
                <i
                    aria-hidden="true"
                    className={styles.icon({ className: `${view.modalIconPrefix ?? "bi bi-"}${view.modalIcon ?? "cone-striped"}` })}/>
                {view.title ?? "Confirmação"}
            </span>}
            pt={{
                mask: { className: styles.mask({ className: props.maskClassName }) },
                header: {
                    className: styles.header({ className: props.draggable === false ? undefined : "cursor-move touch-none" }),
                    onPointerDown: drag.onPointerDown,
                },
                headerTitle: { className: "min-w-0" },
                closeButton: { className: styles.close() },
                content: { className: styles.content() },
            }}
            appendTo={props.appendTo === undefined ? "self" : props.appendTo}
            baseZIndex={props.modalZIndex ?? 1000}
            className={styles.root({ className: props.className })}
            closeOnEscape={props.closeOnEscape ?? closable}
            dismissableMask={props.dismissableMask ?? false}
            draggable={false}
            showCloseIcon={closable}
            transitionOptions={transitionOptions}
            visible={props.visible}
            onShow={() => {
                // Executa antes do foco padrão do PrimeReact, que só age se nada dentro do Dialog estiver focado.
                if (props.autoFocus === "confirm") {
                    confirmRef.current?.focus();
                } else if (props.autoFocus === "cancel") {
                    cancelRef.current?.focus();
                }
            }}
            onHide={() => props.onVisible(false)}>
            <div
                className={styles.body()}
                dangerouslySetInnerHTML={{ __html: view.message ?? "" }}/>
            {(confirm || cancel) && <div className={styles.actions()}>
                {confirm && <Button
                    className={styles.confirm()}
                    color="primary"
                    icon={view.confirmIcon}
                    isLoading={props.isLoading ?? false}
                    label={view.confirmLabel ?? "Confirmar"}
                    ref={confirmRef}
                    onClick={() => props.onConfirm?.()}/>}
                {cancel && <Button
                    className={styles.cancel()}
                    color="secondary"
                    disabled={props.cancelDisabled ?? false}
                    icon={view.cancelIcon}
                    label={view.cancelarLabel ?? "Cancelar"}
                    ref={cancelRef}
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
