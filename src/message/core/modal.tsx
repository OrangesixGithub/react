import React from "react";
import { Box } from "../../box";
import { Modal } from "../../modal";
import { Button } from "../../button";
import { MessageProps } from "../types";
import { JustifyContentProps } from "../../api/types";

/**
 * Core - `ModalMessage`
 * Define o componente do tipo modal
 */
export function ModalMessage({ confirm = true, cancel = true, ...props }: MessageProps<"modal">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Modal backdrop={true}
               className="message"
               closable={props.modalClosable ?? true}
               header={props.title ?? "Confirmação"}
               icon={props.modalIcon ?? "cone-striped"}
               iconPrefix={props.modalIconPrefix ?? "bi bi-"}
               sizes="medium"
               visible={props.visible}
               onVisible={props.onVisible}>
            <Box direction="column"
                 size="100">
                <div dangerouslySetInnerHTML={{ __html: props.message ?? "" }}/>
                <Box className="gap-2"
                     justify={"justify-content-" + (props.modalOptionsPosition ?? "end") as JustifyContentProps}
                     size="100">
                    {confirm && <Button color="success"
                                        icon="check2-circle"
                                        isLoading={props.isLoading ?? false}
                                        label={props.confirmLabel ?? "Confirmar"}
                                        onClick={() => {
                                            if (props.onConfirm) {
                                                props.onConfirm();
                                            }
                                        }}/>}
                    {cancel && <Button color="danger"
                                       icon="slash-circle"
                                       label={props.cancelarLabel ?? "Cancelar"}
                                       onClick={() => {
                                           if (props.onCancel) {
                                               props.onCancel();
                                           } else {
                                               props.onVisible(false);
                                           }
                                       }}/>}
                </Box>
            </Box>
        </Modal>
    );
}